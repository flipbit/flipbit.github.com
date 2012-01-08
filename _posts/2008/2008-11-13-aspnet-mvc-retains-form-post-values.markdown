<p>During my recent exploration of the Microsoft ASP.NET MVC framework I hit a roadblock when posting data back from the browser using a form.  The scenario involved was as basic as you could imagine, a simple HTML form posting back an Id to a controller:<br />
</p><pre name="code" class="csharp:nocontrols">public class JobController : Controller
    {
        public IJobService JobService { get; set; }

        public ActionResult Load(int id)
        {
            ViewData["Job"] = JobService.Load(id);

            return RedirectToAction("ViewJob");
        }
    }
</pre><p>The issue I was having was that my controller wasn’t picking up the Id value.  Changing the code to use the request object solved the problem:<br />
</p><pre name="code" class="csharp:nocontrols">public class JobController : Controller
    {
        public IJobService JobService { get; set; }

        public ActionResult Load()
        {
            var id = int.Parse(Request.Form["id"]);

            ViewData["Job"] = JobService.Load(id);

            return RedirectToAction("ViewJob");
        }
    }
</pre><p>However, this solution was far from satisfactory.  By chance I stumbled across a <a href="http://ayende.com/Blog/archive/2008/11/07/title-left-blank-since-i-cant-think-of-non-inflammatory.aspx" title="Ayende @ Rahien">blog post</a> that was explaining the same issue, caused by the default routing taking precedence over request values.  Removing the Id from the rule solved the problem.<br />
</p><pre name="code" class="csharp:nocontrols">public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                "Default",                                     // Route name
                "{controller}/{action}",                       // URL with parameters
                new { controller = "Home", action = "Index" }  // Parameter defaults
            );
        }
</pre><p>Or not.  Now the code worked perfectly for the first request, however when the value was changed on subsequent requests, the original value was still retained by the controller.  After much searching, I finally found the solution on <a href="http://stackoverflow.com/questions/238460/aspnet-mvc-beta-1-defaultmodelbinder-wrongly-persists-parameter-and-validation" title="ASP.NET MVC Beta 1: DefaultModelBinder wrongly persists parameter and validation state between unrelated requests">Stack Overflow</a>.  I needed to configure my IoC container (Windsor) to use a transient lifestyle, as the controller wasn’t being destroyed between requests.  <br />
</p><pre name="code" class="xml:nocontrols"><component type="Web.Controllers.JobController, Web.Core" 
               lifestyle="transient">
    <parameters>
        <jobservice>${JobService}</JobService>
    </parameters>
</component>
</pre><p>This is how the Monorail controller facility in Windsor behaves be default out of the box; I could quite fathom why the MVC Contrib integration would not do so as well.  One to chalk up to experience...<br />
</p>