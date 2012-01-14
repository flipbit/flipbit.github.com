---
layout: base
title: Representing Large AD and BC Dates in C# - flipbit.co.uk
title_short: Representing Large AD and BC Dates in C#
pretty_date: 13 March 2009
---

Good .Net developers should know that a [DateTime][] has a larger range
than a [SqlDateTime][], and that care needs to be taken when storing
them in databases. For the current project I’m working on, my client
wanted an even bigger data range than .Net allows - for dates going back
to prehistoric times.  

After digging around it was clear that .Net had no such support built
into the framework. Using [custom date formatting][] you can retrieve
the Era (AD or BC) by using the “gg” code. Whilst this isn’t actually be
useful for my purposes (since .Net can only go back as far as the year
1) it does provide a safe way to translate this information depending on
your current locale.  

After some thought I realised that with the increasing range requirement
of the date, the need for accuracy fell - I could get away with just
storing the year needed for the date. Enter the HistoricalDate class, a
class that stores just the year and era of a date.  

    namespace Cogworks.Domain
    {
        /// 
        /// Represents a historical date.
        /// Used for object from and to periods.
        /// 
        public class HistoricalDate
        {
            /// 
            /// Gets or sets the year.
            /// 
            /// The year.
            public int Year { get; set; }

            /// 
            /// Gets or sets the era.
            /// 
            /// The era.
            public Era Era { get; set; }
        }

        /// 
        /// Represents an Era for a HistoricalDate.
        /// 
        public enum Era
        {
            BC,
            AD
        }
    }

Before integrating this new class into the production system, I wrote a
series of unit tests to ensure the class operated correctly. This
included parsing string representations…  

    [Test]
    public void TestParseValidBCString()
    {
        var date = HistoricalDate.Parse("50 BC");

        Assert.AreEqual(Era.BC, date.Era);
        Assert.AreEqual(50, date.Year);
    }

…checking equality and less than/greater than operators…  

    [Test]
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

… and the ToString() method.

    [Test]
    public void TestToString()
    {
        var date = new HistoricalDate("2009 ad");

        Assert.AreEqual("2009 AD", date.ToString());
    }

A common operation that I needed was the Parse() and TryParse()
functions for reading user input. For this I created a NullDate class
that is used to represent the input when it is not a valid date.

    namespace Cogworks.Domain
    {
        public class NullDate : HistoricalDate
        {
            public override string ToString()
            {
                return string.Empty;
            }
        }
    }

…with relevant tests round it…

    [Test]
    public void TestParseValueWithNoEra()
    {
        Assert.AreEqual(new NullDate(), HistoricalDate.Parse("1000"));
    }

Another problem I needed to solve was representing the current date. For
this I created a PresentDate class.

    namespace Cogworks.Domain
    {
        /// 
        /// Represents the present date in HistoricalDate format.
        /// 
        public class PresentDate : HistoricalDate
        {
            /// 
            /// Gets the year.
            /// 
            /// The year.
            public new int Year
            {
                get { return DateTime.Now.Year; }
            }

            /// 
            /// Gets the era.
            /// 
            /// The era.
            public new Era Era
            {
                get { return Era.AD; }
            }
        }
    }

This could then be returned from a static Now() function on the
HistoricalDate class.

    /// 
    /// Gets the present date.
    /// 
    /// The present date.
    public static HistoricalDate Now
    {
        get
        {
            return new PresentDate();
        }
    }

With the new code tested with 28 test cases, I now have a handy class to
use in production. I’ve also made the source available in case anyone
else finds a use for it.            
            
  [Download]: http://cogworks.co.uk/downloads/historicaldate.zip     "Download code shown in this blog post"
  [DateTime]: http://msdn.microsoft.com/en-us/library/system.datetime.aspx     ".Net DateTime structure on MSDN"
  [SqlDateTime]: http://msdn.microsoft.com/en-us/library/system.data.sqltypes.sqldatetime.aspx     ".Net SqlDateTime structure on MSDN"
  [custom date formatting]: http://msdn.microsoft.com/en-us/library/8kb3ddd4.aspx     "Custom Date Formatting in C# on MSDN"