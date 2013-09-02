---
layout: base
title: Querying WHOIS server data with C# - flipbit.co.uk
title_short: Querying WHOIS server data with C#
pretty_date: 13 June 2009
---

Whilst working on a recent project I needed to query the [WHOIS] [1]
information for a domain and determine when it was first registered.

### How WHOIS works

Every domain registered has an associated WHOIS record that identifies
who registered it and when they did so. This registration information is
typically located on the server of the company what registered the
domain.

Getting this information is a simple matter of sending a TCP request to
a WHOIS server on port 43 containing the domain you wish to query. You
can use [CenterGate’s whois-servers.net] [2] service to get the name of
the WHOIS server responsible for the domain's
<acronym title="Top Level Domain">TLD</acronym>.

<div class="center spaced">
    <img src="/content/images/blog/whois-query-flow-diagram.png" alt="Whois Query Flow Diagram" />
</div>

First, you need to query *TLD*.whois-servers.net. This will get you the
details for the relevant registrar for that
<acronym title="Top Level Domain">TLD</acronym>. Querying this server
will get you company who actually registered the domain (*GoDaddy*,
*Verisign*, etc..). A second query to this server will supply the
details of the company or individual who the domain belongs too.

### Building the WHOIS response with the Visitor Pattern

The C# WHOIS lookup class implements a [Visitor Pattern] [3] to iterate
through each part of the process required to create the WHOIS record. As
each stage is a seperate class, it is easier to write and test.

    /// <summary>
    /// Looks up WHOIS information for a given domain.
    /// </summary>
    public class WhoisLookup
    {
      /// <summary>
      /// Gets or sets the visitors.
      /// </summary>
      /// <value>The visitors.</value>
      public IList<IWhoisVisitor> Visitors { get; set; }

      /// <summary>
      /// Initializes a new instance of the <see cref="WhoisLookup"/> class.
      /// </summary>
      public WhoisLookup()
      {
        Visitors = new List<IWhoisVisitor>
        {
          new WhoisServerVisitor(),                // Get intial WHOIS server URL
          new DownloadVisitor(),                   // Download from TLD server

          new ExpandResultsVisitor(),              // Get detailed results
          new DownloadSecondaryServerVisitor(),    // Download from registrar

          new NominetVisitor(),                    // UK domains
          new MarkMonitorVisitor(),                // MarkMonitor (e.g. Google)
          new RipnVisitor()                        // RIPN
        };
      }

      /// <summary>
      /// Lookups the WHOIS information for the specified <see cref="domain"/>.
      /// </summary>
      /// <param name="domain">The domain.</param>
      public WhoisRecord Lookup(string domain)
      {
        var record = new WhoisRecord { Domain = domain };

        foreach (var visitor in Visitors)
        {
          record = visitor.Visit(record);
        }

        return record;
      }
    }

### Finding the WHOIS server for the TLD

The first visitor needs to find the correct WHOIS server to query. This
is performed by the WhoisServerLookup class:

    /// <summary>
    /// Class to lookup a WHOIS server for a given domain name.
    /// </summary>
    public class WhoisServerLookup : IWhoisServerLookup
    {
      /// <summary>
      /// Gets the TLD for a given domain.
      /// </summary>
      /// <param name="domain">The domain.</param>
      /// <returns></returns>
      public string GetTld(string domain)
      {
        var tld = string.Empty;

        if (!string.IsNullOrEmpty(domain))
        {
          var parts = domain.Split('.');

          if (parts.Length > 1) tld = parts[parts.Length - 1];
        }

        return tld;
      }

      /// <summary>
      /// Lookups the WHOIS server for the specified domain.
      /// </summary>
      /// <param name="domain">The domain.</param>
      /// <returns></returns>
      public string Lookup(string domain)
      {
        // This is the default WHOIS server
        var server = "whois.internic.net";

        var tld = GetTld(domain);

        // Hack for TK domains
        if (tld == "tk")
        {
          server = "whois.dot.tk";
        }

        else if (!string.IsNullOrEmpty(tld))
        {
          var whoisServerName = tld + ".whois-servers.net";

          try
          {
            var hostEntry = Dns.GetHostEntry(whoisServerName);

            if (hostEntry.HostName != whoisServerName)
            {
              server = hostEntry.HostName;
            }

          catch (SocketException ex)
          {
            throw new ApplicationException("WHOIS lookup failed for " + domain);
          }
        }

        return server;
      }
    }

### Finding the Registrar WHOIS server

After querying the <acronym title="Top Level Domain">TLD</acronym>
server, we need to parse it’s output for the individual registar server.

    /// <summary>
    /// Expands the WHOIS results if needed to.
    /// </summary>
    public class DownloadSecondaryServerVisitor : IWhoisVisitor
    {
      /// <summary>
      /// Visits the specified record.
      /// </summary>
      /// <param name="record">The record.</param>
      /// <returns></returns>
      public WhoisRecord Visit(WhoisRecord record)
      {
        var referralIndex = record.Text.IndexOfLineEndingWith(": " + record.Domain);

        if (referralIndex > -1)
        {
          var whoIsServer = record.Text.Containing("whois", referralIndex);

          whoIsServer = whoIsServer.SubstringAfterChar(":").Trim();

          using (var tcpReader = TcpReaderFactory.Create())
          {
            record.Text = tcpReader.Read(whoIsServer, 43, record.Domain);
          }
        }

        return record;
      }
    }

By utilizing some C# extension methods, the code looks for an instance
of the domain name in the output, then picks the next line that contains
a WHOIS server address. This server is then queried to get the actual
WHOIS information from the registrar.

### Parsing the WHOIS response

Once we’ve got the WHOIS text, a series of C\# parser classes are then
run over the output to pick out values we’re interested in, and return a
strongly type WHOIS record to use later on.

    /// <summary>
    /// Parses Mark Monitor WHOIS data
    /// </summary>
    public class MarkMonitorVisitor : IWhoisVisitor
    {
      /// <summary>
      /// Visits the specified record.
      /// </summary>
      /// <param name="record">The record.</param>
      public WhoisRecord Visit(WhoisRecord record)
      {
        var referralIndex = record.Text.IndexOfLineContaining("Created on");

        if (referralIndex > -1)
        {
          var registationString = record.Text.Containing("Created on", referralIndex);

          registationString = registationString.SubstringAfterChar(":").Trim();

          DateTime registrationDate;

          if (DateTime.TryParse(registationString, out registrationDate))
          {
            record.Created = registrationDate;
          }
        }

        return record;
      }
    }

As WHOIS records are free-form text, a parser has to be written for each
different format. I’ve included code to look across several formats.
Each parser will only pick out the first registered date, however there
is no reason why this code couldn’t be extended to pull out additional
information.

  [1]: http://en.wikipedia.org/wiki/WHOIS                   "Read about the WHOIS protocol on Wikipedia"
  [2]: http://www.centergate.com/                           "CenterGate's WHOIS lookup service"
  [3]: http://en.wikipedia.org/wiki/Visitor_pattern         "Read about the Visitor Pattern on Wikipedia"