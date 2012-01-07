<div class="downloader floatRight"><a href="http://www.cogworks.co.uk/downloads/whois.zip" title="Download the latest version of the C# WHOIS Lookup">Download</a>
<span>Released:
13th June, 2009</span>
</div><p>Whilst working on a recent project I needed to query the <a title="Read about the WHOIS protocol on Wikipedia" href="http://en.wikipedia.org/wiki/WHOIS">WHOIS</a> information for a domain and determine when it was first registered.
</p>
<p>An <a title="Instant WHOIS Lookup" href="http://www.cogworks.co.uk/whois/instant-whois-search.html">online demo</a> of this code is available.
</p>
<h3>How WHOIS works</h3>
<p>Every domain registered has an associated WHOIS record that identifies who registered it and when they did so.  This registration information is typically located on the server of the company what registered the domain. 
</p>
<p>Getting this information is a simple matter of sending a TCP request to a WHOIS server on port 43 containing the domain you wish to query.  You can use <a title="CenterGate's WHOIS lookup service" href="http://www.centergate.com/">CenterGate's whois-servers.net</a> service to get the name of the WHOIS server responsible for the domain's <acronym title="Top Level Domain">TLD</acronym>.
</p>
<p class="center"><img src="http://cogworks.co.uk/images/blog/whois-query-flow-diagram.jpg" alt="Whois Query Flow Diagram" />
</p>
<p>First, you need to query <em>TLD</em>.whois-servers.net.  This will get you the details for the relevant registrar for that <acronym title="Top Level Domain">TLD</acronym>.  Querying this server will get you company who actually registered the domain (<em>GoDaddy</em>, <em>Verisign</em>, etc..).  A second query to this server will supply the details of the company or individual who the domain belongs too.
</p>
<h3>Building the WHOIS response with the Visitor Pattern</h3>
<p>The C# WHOIS lookup class implements a <a title="Read about the Visitor Pattern on Wikipedia" href="http://en.wikipedia.org/wiki/Visitor_pattern">Visitor Pattern</a> to iterate through each part of the process required to create the WHOIS record.  As each stage is a seperate class, it is easier to write and test.
</p>
<pre name="code" class="csharp:nocontrols">/// &lt;summary&gt;
/// Looks up WHOIS information for a given domain.
/// &lt;/summary&gt;
public class WhoisLookup
{
  /// &lt;summary&gt;
  /// Gets or sets the visitors.
  /// &lt;/summary&gt;
  /// &lt;value&gt;The visitors.&lt;/value&gt;
  public IList&lt;IWhoisVisitor&gt; Visitors { get; set; }

  /// &lt;summary&gt;
  /// Initializes a new instance of the &lt;see cref="WhoisLookup"/&gt; class.
  /// &lt;/summary&gt;
  public WhoisLookup()
  {
    Visitors = new List&lt;IWhoisVisitor&gt;
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

  /// &lt;summary&gt;
  /// Lookups the WHOIS information for the specified &lt;see cref="domain"/&gt;.
  /// &lt;/summary&gt;
  /// &lt;param name="domain"&gt;The domain.&lt;/param&gt;
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
</pre>
<h3>Finding the WHOIS server for the TLD</h3>
<p>The first visitor needs to find the correct WHOIS server to query.  This is performed by the WhoisServerLookup class:
</p>
<pre name="code" class="csharp:nocontrols">/// &lt;summary&gt;
/// Class to lookup a WHOIS server for a given domain name.
/// &lt;/summary&gt;
public class WhoisServerLookup : IWhoisServerLookup
{
  /// &lt;summary&gt;
  /// Gets the TLD for a given domain.
  /// &lt;/summary&gt;
  /// &lt;param name="domain"&gt;The domain.&lt;/param&gt;
  /// &lt;returns&gt;&lt;/returns&gt;
  public string GetTld(string domain)
  {
    var tld = string.Empty;

    if (!string.IsNullOrEmpty(domain))
    {
      var parts = domain.Split('.');

      if (parts.Length &gt; 1) tld = parts[parts.Length - 1];
    }

    return tld;
  }

  /// &lt;summary&gt;
  /// Lookups the WHOIS server for the specified domain.
  /// &lt;/summary&gt;
  /// &lt;param name="domain"&gt;The domain.&lt;/param&gt;
  /// &lt;returns&gt;&lt;/returns&gt;
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
</pre>
<h3>Finding the Registrar WHOIS server</h3>
<p>After querying the <acronym title="Top Level Domain">TLD</acronym> server, we need to parse it's output for the individual registar server.
</p>
<pre name="code" class="csharp:nocontrols">/// &lt;summary&gt;
/// Expands the WHOIS results if needed to.
/// &lt;/summary&gt;
public class DownloadSecondaryServerVisitor : IWhoisVisitor
{
  /// &lt;summary&gt;
  /// Visits the specified record.
  /// &lt;/summary&gt;
  /// &lt;param name="record"&gt;The record.&lt;/param&gt;
  /// &lt;returns&gt;&lt;/returns&gt;
  public WhoisRecord Visit(WhoisRecord record)
  {
    var referralIndex = record.Text.IndexOfLineEndingWith(": " + record.Domain);

    if (referralIndex &gt; -1)
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
</pre>
<p>By utilizing some C# extension methods, the code looks for an instance of the domain name in the output, then picks the next line that contains a WHOIS server address.  This server is then queried to get the actual WHOIS information from the registrar.
</p>
<h3>Parsing the WHOIS response</h3>
<p>Once we've got the WHOIS text, a series of C# parser classes are then run over the output to pick out values we're interested in, and return a strongly type WHOIS record to use later on.
</p>
<pre name="code" class="csharp:nocontrols">/// &lt;summary&gt;
/// Parses Mark Monitor WHOIS data
/// &lt;/summary&gt;
public class MarkMonitorVisitor : IWhoisVisitor
{
  /// &lt;summary&gt;
  /// Visits the specified record.
  /// &lt;/summary&gt;
  /// &lt;param name="record"&gt;The record.&lt;/param&gt;
  public WhoisRecord Visit(WhoisRecord record)
  {
    var referralIndex = record.Text.IndexOfLineContaining("Created on");

    if (referralIndex &gt; -1)
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
</pre>
<p>As WHOIS records are free-form text, a parser has to be written for each different format.  I've included code to look across several formats.  Each parser will only pick out the first registered date, however there is no reason why this code couldn't be extended to pull out additional information.
</p>