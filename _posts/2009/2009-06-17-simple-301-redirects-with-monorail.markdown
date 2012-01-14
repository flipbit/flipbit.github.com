---
layout: base
title: Simple 301 Redirects with Monorail - flipbit.co.uk
title_short: Simple 301 Redirects with Monorail
pretty_date: 17 June 2009
---

Chances are, if you have a site on the Internet, and users are linking
to it, they are going to link to versions of your domain with and
without a "www" prefix. Whilst there have been calls to [drop the www
prefix] [1], you should ensure that your server is configured to accept
both versions in order not to loose visitors.

However, search engines too will pick up on both these link formats.
Whilst this might not seem like a problem, you are in effect running two
versions of your site and may be penalised for having [duplicate
content] [2].

Enter the [301 "Moved Permanently" redirect] [3]. This tells search
engines that content on your server has moved to a new location, in this
case the version of your site with the correct domain prefix.

### Writing a 301 Redirect Filter for Monorail

Writing a cross-cutting concern such as this is made easy when using
[Castle Monorail MVC] [4]. It’s answer to aspect orientated programming
issues are filters. Filters can be attached to controllers and processed
before the controller action is executed. When attaching a filter such
as this, you can define it on an abstract controller class, so that all
inheriting controllers have the filter defined.

    /// <summary>
    /// Abstract controller that all controller inherit from.
    /// </summary>
    [Filter(ExecuteEnum.StartRequest, typeof(RedirectFilter))]
    public class AbstractController : SmartDispatcherController
    {
    }

The actual filter it self is relatively simple, it just checks for the
incorrect domain (in this case without the “www” prefix) and redirects
to a version with it.

    /// <summary>
    /// Redirects traffic to a domain with the correct prefix
    /// </summary>
    public class RedirectFilter : IFilter
    {
      /// <summary>
      /// Performs the filter before the controller is invoked by the rails engine.
      /// </summary>
      /// <param name="exec">The exec.</param>
      /// <param name="context">The context.</param>
      /// <param name="controller">The controller.</param>
      /// <returns></returns>
      public bool Perform(ExecuteEnum exec, 
                          IRailsEngineContext context, 
                          Controller controller)
      {
        if (context.Request.IsLocal) return true;

        var httpContext = HttpContext.Current;

        if (httpContext.Request.Url.AbsoluteUri.IndexOf("www", 
                     StringComparison.InvariantCultureIgnoreCase) == -1)
        {
          var url = "http://www." + httpContext.Request.Url.DnsSafeHost;

          // Add path
          url += httpContext.Request.RawUrl;

          httpContext.Response.Status = "301 Moved Permanently";
          httpContext.Response.StatusCode = 301;
          httpContext.Response.AppendHeader("Location", url);
          httpContext.Response.End();  
        }

        return true;
      }
    }

In the filter I use the HttpContext class directly, rather than the
Monorail context. Whilst this will cause problems when unit testing the
filter, I need to access the RawUrl and StatusCode properties. The
RawUrl property represents the request URL before any rewriting was
performed, so it will redirect to the correct URL.

  [1]: http://no-www.org/                                                   "WWW is deprecated"
  [2]: http://www.seogrep.com/rule/domain-name-prefix                       "Test your domain prefix on seogrep.com"
  [3]: http://en.wikipedia.org/wiki/URL_redirection#HTTP_status_codes_3xx   "HTTP Redirects on Wikipedia"
  [4]: http://www.castleproject.org/monorail/                               "Castle Project's Monorail MVC framework"