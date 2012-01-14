---
layout: base
title: Querying Google Analytics with .NET - flipbit.co.uk
title_short: Querying Google Analytics with .NET
pretty_date: 1st November 2009
---

Google recently [introduced an API] [1]  for their [Analytics service] [2]  allowing you to query 
and download the statistics captured.  Using a some C# .NET [example code] [3] as a base, I created 
a fluent interface (using [method chaining] [4]) to the API and a console application to call it from.


Calling the API to get the most popular pages for the last day is trivial:

    /// <summary>
    /// The Google Analytics command line application.
    /// </summary>
    static class Program
    {
        static void Main(string[] args)
        {
            var results = new AnalyticQuery()
                .WithCredentials(username, password)
                .SelectTopContent()
                .ForYesterday();

            Console.Write(new TextFormatter().Format(results));
        }
    }

Using the text output formatter produces the following result:

<pre>Google Analytics for 02 October 09
Top Content for seogrep.com
===========================
    29 : /
    29 : /site/results
    28 : /site/loading
    10 : /site/domain-results/
    5 : /dead-links/results
    4 : /user/edit
    3 : /page/results/6Z3
    3 : /site/view/IK
    2 : /dead-links/results/bad
    2 : /dead-links/results/ok</pre>

###Complex Queries and CSV Output

The query object uses object chaining enable you to easily build up a complex query using inteliisense:

    /// <summary>
    /// The Google Analytics command line application.
    /// </summary>
    static class Program
    {
        static void Main(string[] args)
        {
            var results = new AnalyticQuery()
                .WithCredentials(username, password)
                .Select(Metric.Visitors)
                .Having(Dimension.Date, Dimension.PageTitle)
                .FromTheDate(DateTime.Now.AddMonths(-1))
                .ToTheDate(DateTime.Now)
                .ForDomain("seogrep.com")
                .OrderDecending()
                .Top(100);

            Console.Write(new CsvFormatter().Format(results));
        }
    }

This would produce the following output (using the CSV formatter):

<pre>"www.seogrep.com","12","20091031","Simple SEO Statistics and Tracking - SEO grep"
"www.seogrep.com","8","20091030","Simple SEO Statistics and Tracking - SEO grep"
"www.seogrep.com","8","20091031","Analysing your site - SEO grep"
"www.seogrep.com","3","20091030","Analysis of letsgetdigitaltv.co.uk - SEO grep"
"www.seogrep.com","3","20091031","Dead Links - SEO grep"
"www.seogrep.com","2","20091030","Analysing your site - SEO grep"
"www.seogrep.com","2","20091030","Analysis of Site Root - SEO grep"
"www.seogrep.com","2","20091031","Analysis of Site Root - SEO grep"
"www.seogrep.com","2","20091031","Dead Link Analysis for Site Root - SEO grep"
"www.seogrep.com","2","20091031","Page Contains an H1 Tag Rule Analysis - SEO grep"
"www.seogrep.com","1","20091030","Analysis of nubilus.nl - SEO grep"
"www.seogrep.com","1","20091030","Analysis of www.letsgetdigitaltv.co.uk - SEO grep"
"www.seogrep.com","1","20091030","Analysis of x6grey/ - SEO grep"
"www.seogrep.com","1","20091030","Page URL Contains Underscores Rule Analysis - SEO grep"
"www.seogrep.com","1","20091031","Analysis of demusicalbende.nl - SEO grep"
"www.seogrep.com","1","20091031","Analysis of fashiondays.nl - SEO grep"
"www.seogrep.com","1","20091031","Analysis of index.php - SEO grep"
"www.seogrep.com","1","20091031","Analysis of lookbook.nu - SEO grep"
"www.seogrep.com","1","20091031","Analysis of musical.nl - SEO grep"</pre>

  [1]: http://code.google.com/apis/analytics/docs/gdata/gdataDeveloperGuide.html                                        "Google Analytics Rich Data Export API"
  [2]: http://www.google.com/analytics/                                                                                 "Google Analytics" 
  [3]: http://www.reimers.dk/blogs/jacob_reimers_weblog/archive/2009/05/09/added-google-analytics-reader-for-net.aspx   "Added Google Analytics Reader for .NET" 
  [4]: http://en.wikipedia.org/wiki/Method_chaining                                                                     "Method Chaining on Wikipedia"