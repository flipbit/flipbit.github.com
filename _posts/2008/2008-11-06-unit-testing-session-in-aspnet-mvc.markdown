---
layout: base
title: Unit Testing Session in an ASP.NET MVC Controller
title_short: Unit Testing Session in an ASP.NET MVC Controller
pretty_date: 6 November 2008
---

I’ve recently started to use the [Microsoft ASP.NET MVC][] framework.
Being very familiar with the [Castle Monorail][], I was a bit dubious to
how the Microsoft framework would hold up.  

One of the first tasks I had difficulty with was writing a basic unit
test to see whether a user was logged in, through holding their
credentials in session:  

    using NUnit.Framework;

    [TestFixture]
    public class HomeControllerTest
    {
        private HomeController controller;

        [Test]
        public void TestIndexAction()
        {
            controller = new HomeController();

            // Display the homepage
            controller.Index();

            // Verify the user object hasn't been set in session
            Assert.IsNull(controller.ControllerContext.HttpContext.Session["user"]);
        }
    }

When I can to run this test, it failed as the HttpContextSessionBase
class hadn’t been instantiated. After googling this, [several][]
[blogs][] had described the same issue; however I couldn’t find an
answer without manually Mocking or creating Fakes. Monorail conversely,
has the solution is built into the framework:  

    [TestFixture]
    class HomeControllerTest : BaseControllerTest
    {
        private HomeController controller;

        [SetUp]
        public void SetUp()
        {
            controller = new HomeController();

            PrepareController(controller);
        }

        [Test]
        public void TestIndexAction()
        {
            // Display homepage
            controller.Index();

            // Verify the user object hasn't been set in session
            Assert.IsNull(controller.Context.Session["user"]);
        }
    }

After further research, I came across the [MVC Contrib Project][] on
Codeplex. Adding references to their testing assembly I was able to
write the following:  

    using MvcContrib.TestHelper;
    using NUnit.Framework;

    [TestFixture]
    public class HomeControllerTest
    {
        private HomeController controller;
        private TestControllerBuilder builder;

        [SetUp]
        public void SetUp()
        {
            builder = new TestControllerBuilder();

            controller = new HomeController();

            builder.InitializeController(controller);
        }

        [Test]
        public void TestIndexAction()
        {
            // Display the homepage
            controller.Index();

            // Verify the user object hasn't been set in session
            Assert.IsNull(controller.ControllerContext.HttpContext.Session["user"]);
        }
    }

In order to run it requires a reference to [Rhino.Mocks][], so I guess
under the hood this is what it’s using.  

It would be good if this kind of testing simplicity was baked into the
framework, as in Monorail, but it seems ASP.NET MVC still has some way
to go to escape the burden of the sealed ASP.NET HttpContext classes.   

  [Microsoft ASP.NET MVC]: http://www.asp.net/mvc/     "Microsoft ASP.NET MVC Framework"
  [Castle Monorail]: http://www.castleproject.org/MonoRail/     "Castle Project Monorail Framework"
  [several]: http://weblogs.asp.net/leftslipper/archive/2008/04/13/mvc-unit-testing-controller-actions-that-use-tempdata.aspx     "Eilon Lipton's Blog"
  [blogs]: http://weblogs.asp.net/stephenwalther/archive/2008/06/30/asp-net-mvc-tip-12-faking-the-controller-context.aspx     "Stephen Walther on ASP.NET MVC"
  [MVC Contrib Project]: http://www.codeplex.com/MVCContrib     "ASP.NET MVC Contrib Project Homepage"
  [Rhino.Mocks]: http://ayende.com/projects/rhino-mocks.aspx