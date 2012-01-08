<div class="downloader floatRight"><a href="http://cogworks.co.uk/downloads/historicaldate.zip" title="Download code shown in this blog post">Download</a><br />
<span>Released:<br />
13th March, 2009</span><br />
</div><p>Good .Net developers should know that a <a href="http://msdn.microsoft.com/en-us/library/system.datetime.aspx" rel="nofollow" title=".Net DateTime structure on MSDN">DateTime</a> has a larger range than a <a href="http://msdn.microsoft.com/en-us/library/system.data.sqltypes.sqldatetime.aspx" rel="nofollow" title=".Net SqlDateTime structure on MSDN">SqlDateTime</a>, and that care needs to be taken when storing them in databases.  For the current project I'm working on, my client wanted an even bigger data range than .Net allows - for dates going back to prehistoric times.<br />
</p><p>After digging around it was clear that .Net had no such support built into the framework.  Using <a href="http://msdn.microsoft.com/en-us/library/8kb3ddd4.aspx" rel="nofollow" title="Custom Date Formatting in C# on MSDN">custom date formatting</a> you can retrieve the Era (AD or BC) by using the "gg" code.  Whilst this isn't actually be useful for my purposes (since .Net can only go back as far as the year 1) it does provide a safe way to translate this information depending on your current locale.<br />
</p><p>After some thought I realised that with the increasing range requirement of the date, the need for accuracy fell - I could get away with just storing the year needed for the date.  Enter the HistoricalDate class, a class that stores just the year and era of a date.<br />
</p><pre name="code" class="csharp:nocontrols">namespace Cogworks.Domain
{
    /// <summary>
    /// Represents a historical date.
    /// Used for object from and to periods.
    /// </summary>
    public class HistoricalDate
    {
        /// <summary>
        /// Gets or sets the year.
        /// </summary>
        /// <value>The year.</value>
        public int Year { get; set; }

        /// <summary>
        /// Gets or sets the era.
        /// </summary>
        /// <value>The era.</value>
        public Era Era { get; set; }
    }

    /// <summary>
    /// Represents an Era for a HistoricalDate.
    /// </summary>
    public enum Era
    {
        BC,
        AD
    }
}
</pre><p>Before integrating this new class into the production system, I wrote a series of unit tests to ensure the class operated correctly.  This included parsing string representations...<br />
</p><pre name="code" class="csharp:nocontrols">[Test]
public void TestParseValidBCString()
{
    var date = HistoricalDate.Parse("50 BC");

    Assert.AreEqual(Era.BC, date.Era);
    Assert.AreEqual(50, date.Year);
}
</pre><p>...checking equality and less than/greater than operators...<br />
</p><pre name="code" class="csharp:nocontrols">[Test]
public void TestEqualsWhenNotEqual()
{
    var date1 = HistoricalDate.Parse("2000 AD");
    var date2 = "test";

    Assert.IsFalse(date1.Equals(date2));
}


[Test]
public void TestADLessThanWhenTrue()
{
    var date1 = HistoricalDate.Parse("1999 AD");
    var date2 = HistoricalDate.Parse("2000 AD");

    Assert.IsTrue(date1 < date2);
}
</pre>
<p>... and the ToString() method.
</p><pre name="code" class="csharp:nocontrols">[Test]
public void TestToString()
{
    var date = new HistoricalDate("2009 ad");

    Assert.AreEqual("2009 AD", date.ToString());
}
</pre><p>A common operation that I needed was the Parse() and TryParse() functions for reading user input.  For this I created a NullDate class that is used to represent the input when it is not a valid date.
</p><pre name="code" class="csharp:nocontrols">namespace Cogworks.Domain
{
    public class NullDate : HistoricalDate
    {
        public override string ToString()
        {
            return string.Empty;
        }
    }
}
</pre><p>...with relevant tests round it...
</p><pre name="code" class="csharp:nocontrols">[Test]
public void TestParseValueWithNoEra()
{
    Assert.AreEqual(new NullDate(), HistoricalDate.Parse("1000"));
}
</pre><p>Another problem I needed to solve was representing the current date.  For this I created a PresentDate class.
</p><pre name="code" class="csharp:nocontrols">namespace Cogworks.Domain
{
    /// <summary>
    /// Represents the present date in HistoricalDate format.
    /// </summary>
    public class PresentDate : HistoricalDate
    {
        /// <summary>
        /// Gets the year.
        /// </summary>
        /// <value>The year.</value>
        public new int Year
        {
            get { return DateTime.Now.Year; }
        }

        /// <summary>
        /// Gets the era.
        /// </summary>
        /// <value>The era.</value>
        public new Era Era
        {
            get { return Era.AD; }
        }
    }
}
</pre><p>This could then be returned from a static Now() function on the HistoricalDate class.
</p><pre name="code" class="csharp:nocontrols">/// <summary>
/// Gets the present date.
/// </summary>
/// <value>The present date.</value>
public static HistoricalDate Now
{
    get
    {
        return new PresentDate();
    }
}
</pre><p>With the new code tested with 28 test cases, I now have a handy class to use in production.  I've also made the source available in case anyone else finds a use for it.
</p>