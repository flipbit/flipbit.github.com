---
layout: base
title: Unit Testing Internet Connected Applications in C# - flipbit.co.uk
title_short: Unit Testing Internet Connected Applications in C#
pretty_date: 16 June 2009
---

Test Driven Development and unit testing promote a style of coding that
produces lean, decoupled production code. The unit tests can be
retrospectively run to confirm that your code is working as intended;
providing a useful base for regression testing and future development.
However, what happens when your tests have a dependencies on external
resources, specifically network based ones?  

  

This is a problem I ran up [against recently] [1]. The following code is
part of a WHOIS lookup class. This delegates downloading raw data to a
class that implements the custom ITcpReader interface. The reader is
instantiated within a using block, to ensure that that is disposed of
correctly and the underlying TCP connection is closed.  

  

    /// <summary>
    /// Downloads WHOIS information from the specified WHOIS server
    /// </summary>
    public class DownloadVisitor : IWhoisVisitor
    {
      /// <summary>
      /// Gets or sets the TCP reader factory.
      /// </summary>
      /// <value>The TCP reader factory.</value>
      public ITcpReaderFactory TcpReaderFactory { get; set; }

      /// <summary>
      /// Visits the specified record.
      /// </summary>
      /// <param name="record">The record.</param>
      public WhoisRecord Visit(WhoisRecord record)
      {
        using (var tcpReader = TcpReaderFactory.Create())
        {
          record.Text = tcpReader.Read(record.Server, 43, record.Domain);
        }

        return record;
      }
    }

  

As the reader implements IDisposable, it can’t be reinstantiated after
it’s been disposed of. Because of this, I created a factory class that
would create new instances of the reader for me.  

  

### Injecting the Reader with a Factory Class  

  

After some experimentation with mocking frameworks, interfaces and
objects implementing IDisposable, I settled on creating two factory
classes - one that returned the true TCP reader, and one that returned a
fake (shown).  

  

    /// <summary>
    /// Returns <see cref="FakeTcpReader"/> objects for testing.
    /// </summary>
    internal class FakeTcpReaderFactory : ITcpReaderFactory 
    {
      public ITcpReader Create()
      {
        return new FakeTcpReader();
      }
    }

  

Both factories could can be swapped in as they both implement the
correct interface. Whilst the real reader is wired up at runtime through
[Windsor] [2], I simple override the factory during my unit tests.  

  

    [TestFixture]
    public class DownloadVisitorTest
    {
      private DownloadVisitor visitor;

      [SetUp]
      public void SetUp()
      {
        // Initialize visitor with the Fake TcpReader Factory so we get canned responses
        visitor = new DownloadVisitor { TcpReaderFactory = new FakeTcpReaderFactory() };
      }

      [Test]
      public void TestDownloadCogworksCoUk()
      {
        var record = new WhoisRecord {Domain = "cogworks.co.uk"};

        visitor.Visit(record);

        // Should of gone to NOMINET
        Assert.Greater(record.Text.IndexOfLineContaining("Nominet"), -1);
      }

      [Test]
      public void TestDownloadGoogleCom()
      {
        var record = new WhoisRecord { Domain = "google.com" };

        visitor.Visit(record);

        // Should returned multiple matches (extra spam records)
        Assert.Greater(record.Text.IndexOfLineContaining(@"To single out one record"), -1);
      }
    }

  

### Stubbing External Responses with a Fake  

The FakeTcpReader class basically returns canned responses that I
captured whilst building the application. Based upon the input send to
the class, it simply returns the value of a constant. I’ve omitted the
constant values from the sample for brevity.  

  

    /// <summary>
    /// Fakes out TCP responses for testing
    /// </summary>
    internal class FakeTcpReader : ITcpReader
    {
      private const string FakeCogworksResponse = " ... ";
      private const string FakeGoogleResponse1 = " ... ";
      private const string FakeGoogleResponse2 = " ... ";
      private const string FakeGoogleResponse3 = " ... ";

      public ArrayList Read(string url, int port, string command)
      {
        var response = new ArrayList();

        switch (command)
        {
          case "cogworks.co.uk":
            response.AddRange(FakeCogworksResponse.Split('\n'));
            break;

          case "google.com":
            if (url == ""whois.markmonitor.com")
              response.AddRange(FakeGoogleResponse3.Split('\n'));
            else
              response.AddRange(FakeGoogleResponse1.Split('\n'));
            break;

          case "=google.com":
            response.AddRange(FakeGoogleResponse2.Split('\n'));
            break;
        };

        return response;
      }
    }

Sometimes using a simple Fake is easier and clearer than setting up mock
objects. Doing so like this mean that you can execute all your unit
tests without needing to worry about network availability or changes in
the server responses (you should leave that for your integration
testing).  

All the testing code is available to download in my post about [WHOIS
lookups] [3].  

  [1]: /2009/06/querying-whois-server-data-with-c.html        "WHOIS lookup in C#"
  [2]: http://www.castleproject.org/container/index.html      "Castle Windsor IoC"
  [3]: /2009/06/querying-whois-server-data-with-c.html        "WHOIS lookup in C#"
