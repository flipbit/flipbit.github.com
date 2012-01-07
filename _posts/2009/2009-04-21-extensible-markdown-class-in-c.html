<p>The <a title="Markdown Format Specification" href="http://daringfireball.net/projects/markdown/">Markdown Format</a> is widely used on the web to enable users to enter basic HTML formatting without the need to verify full mark-up.  Various <a href="http://aspnetresources.com/blog/markdown_announced.aspx" title="Markdown Language in C#">C# implementations</a> of the standard exist online, however for I only needed to implement some of the specification, whilst adding bespoke formatting options.<br />
</p><p>The implementations of the standard I found online had a couple of problems with them: firstly, there were no unit tests against them so I couldn’t verify their correct operation.  Secondly, in order to extend them, I’d have to crack open the implementation and start messing around with the code.<br />
</p><p>Using the existing code as a base, I decided to re-write an implementation with a specification (unit tests) and points for future extensibility.  I wanted to enable the resulting code to be closed to modification of its existing behaviour, but open to extension without requiring the need to dig into the existing codebase (the <a href="http://en.wikipedia.org/wiki/Open/closed_principle" title="The Open-Closed Principle on Wikipedia">Open-Closed principle</a>).<br />
</p><p>I decided to implement this using the <a href="http://en.wikipedia.org/wiki/Visitor_pattern" title="The Visitor Pattern on Wikipedia">visitor pattern</a>.  This defines a series of individual visitors, or marklets, which will each pass over the markdown input to transform it into mark-up.  Because there is a chain of visitors, it is easy to append new visitors to the chain and extend the functionality of the class.  <br />
</p><pre name="code" class="csharp:nocontrols">namespace Cogworks
{
    /// &lt;summary&gt;
    /// Converts Markdown into Markup
    /// &lt;/summary&gt;
    static public class Markdown
    {
        private static readonly IList&lt;abstractmarklet&gt; Marklets;

        /// &lt;summary&gt;
        /// Initializes the &lt;see cref="Markdown"/&gt; class.
        /// &lt;/summary&gt;
        static Markdown()
        {
            // You could initilize this from an IoC container if you wanted.
            Marklets = new List&lt;abstractmarklet&gt;             
                                {   
                                    new CleanupMarklet(),
                                    new PreMarklet(),
                                    new ItalicMarklet(),
                                    new BoldMarklet(),
                                    new NewParagraphMarklet(),
                                    new BreakMarklet()
                                };
        }


        /// &lt;summary&gt;
        /// Converts the given &lt;see cref="markdown"/&gt;
        /// &lt;/summary&gt;
        /// &lt;param name="markdown"&gt;The markdown.&lt;/param&gt;
        /// &lt;returns&gt;&lt;/returns&gt;
        public static string ToMarkup(this String markdown)
        {
            foreach(var marklet in Marklets)
            {
                markdown = marklet.Markup(markdown);
            }

            return markdown;
        }
    }
}
</pre><p>As each marklet is a unique class, it is smaller and easier to understand, test and debug.<br />
</p><pre name="code" class="csharp:nocontrols">namespace Cogworks
{
    /// &lt;summary&gt;
    /// Converts bold Markdown into HTML markup.
    /// &lt;/summary&gt;
    /// &lt;example&gt;
    /// ##bold text##
    /// &lt;/example&gt;
    public class BoldMarklet : AbstractMarklet
    {
        /// &lt;summary&gt;
        /// Converts the given markdown into markup.
        /// &lt;/summary&gt;
        /// &lt;param name="value"&gt;The markdown input.&lt;/param&gt;
        /// &lt;returns&gt;HTML markup&lt;/returns&gt;
        public override string Markup(string value)
        {
            var markdown = string.Empty;

            if (!string.IsNullOrEmpty(value))
            {
                markdown = Replace(value, @"\#\#(.*?)\#\#", Evaluator);
            }

            return markdown;
        }

        private static string Evaluator(Match match)
        {
            return string.Format("&lt;strong&gt;{0}&lt;/strong&gt;", match.Groups[1].Value);
        }
    }
}
</pre><p>The unit tests represent the specification of the markdown language:<br />
</p><pre name="code" class="csharp:nocontrols">[TestFixture]
public class BoldMarkletTest
{
    private BoldMarklet marklet;

    [SetUp]
    public void SetUp()
    {
        marklet = new BoldMarklet();
    }

    [Test]
    public void TestMarkdownWhenNull()
    {
        var markup = marklet.Markup(null);

        Assert.AreEqual(string.Empty, markup);
    }

    [Test]
    public void TestMarkdownPlainText()
    {
        var markup = marklet.Markup("Plain Text");

        Assert.AreEqual("Plain Text", markup);
    }

    [Test]
    public void TestMarkdownBoldText()
    {
        var markup = marklet.Markup("Some ##Bold## Text");

        Assert.AreEqual("Some &lt;strong&gt;Bold&lt;/strong&gt; Text", markup);
    }

    [Test]
    public void TestMarkdownUnclosedBoldText()
    {
        var markup = marklet.Markup("Some ##Bold Text");

        Assert.AreEqual("Some ##Bold Text", markup);
    }

    [Test]
    public void TestMarkdownMultipleBoldText()
    {
        var markup = marklet.Markup("Some ##1## ##2## Text");

        Assert.AreEqual("Some &lt;strong&gt;1&lt;/strong&gt; &lt;strong&gt;2&lt;/strong&gt; Text", markup);
    }
</pre><p>A large 1,000+ line class can be shrunk down to a collection of 10 line classes.  <br />
</p><p>Extensibility can also be achieved through an Inversion of Control container, meaning changes can be made without the need to re-compile.<br />
</p>