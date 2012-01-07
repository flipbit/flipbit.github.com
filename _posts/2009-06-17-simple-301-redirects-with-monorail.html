<p>Chances are, if you have a site on the Internet, and users are linking to it, they are going to link to versions of your domain with and without a "www" prefix.  Whilst there have been calls to <a title="WWW is deprecated" href="http://no-www.org/">drop the www prefix</a>, you should ensure that your server is configured to accept both versions in order not to loose visitors.
</p>
<p>However, search engines too will pick up on both these link formats.  Whilst this might not seem like a problem, you are in effect running two versions of your site and may be penalised for having <a title="Test your domain prefix on seogrep.com" href="http://www.seogrep.com/rule/domain-name-prefix">duplicate content</a>.
</p>
<p>Enter the <a title="HTTP Redirects on Wikipedia" href="http://en.wikipedia.org/wiki/URL_redirection#HTTP_status_codes_3xx" >301 "Moved Permanently" redirect</a>.  This tells search engines that content on your server has moved to a new location, in this case the version of your site with the correct domain prefix.
</p>
<h3>Writing a 301 Redirect Filter for Monorail</h3>
<p>Writing a cross-cutting concern such as this is made easy when using <a title="Castle Project's Monorail MVC framework" href="http://www.castleproject.org/monorail/">Castle Monorail MVC</a>.  It's answer to aspect orientated programming issues are filters.  Filters can be attached to controllers and processed before the controller action is executed.  When attaching a filter such as this, you can define it on an abstract controller class, so that all inheriting controllers have the filter defined.
</p>
<pre name="code" class="csharp:nocontrols">/// &lt;summary&gt;
/// Abstract controller that all controller inherit from.
/// &lt;/summary&gt;
[Filter(ExecuteEnum.StartRequest, typeof(RedirectFilter))]
public class AbstractController : SmartDispatcherController
{
}
</pre>
<p>The actual filter it self is relatively simple, it just checks for the incorrect domain (in this case without the "www" prefix) and redirects to a version with it.
</p>
<pre name="code" class="csharp:nocontrols">/// &lt;summary&gt;
/// Redirects traffic to a domain with the correct prefix
/// &lt;/summary&gt;
public class RedirectFilter : IFilter
{
  /// &lt;summary&gt;
  /// Performs the filter before the controller is invoked by the rails engine.
  /// &lt;/summary&gt;
  /// &lt;param name="exec"&gt;The exec.&lt;/param&gt;
  /// &lt;param name="context"&gt;The context.&lt;/param&gt;
  /// &lt;param name="controller"&gt;The controller.&lt;/param&gt;
  /// &lt;returns&gt;&lt;/returns&gt;
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
</pre>
<p>In the filter I use the HttpContext class directly, rather than the Monorail context.  Whilst this will cause problems when unit testing the filter, I need to access the RawUrl and StatusCode properties.  The RawUrl property represents the request URL before any rewriting was performed, so it will redirect to the correct URL.
</p>