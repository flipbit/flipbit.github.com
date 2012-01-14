---
layout: base
title: Searching Public Domain UK Postcodes
title_short: Searching Public Domain UK Postcodes
pretty_date: 28 July 2009
---

<div class="alert-message block-message info">
    <p>
        <strong>Update:</strong> You can now download all UK postcode data from the <a href="http://www.ordnancesurvey.co.uk/oswebsite/products/os-opendata.html">Ordnance Survey</a>.
        This page is for information only.
    </p>
</div>

Postcodes divide the United Kingdom into logical groups for addresses, averaging [15 properties per postcode] [1].  
Postcodes have rough latitude and longitude coordinates associated with them, which makes them useful for location 
aware applications such as tracking and social networking.  Unfortunatley the Postcode Address File (PAF) is owned 
by the Royal Mail, who charge for access and generate revenues of [&pound;14.9m every year] [2].

<div class="center">
    <a href="http://www.flickr.com/photos/asplosh/218662108/" title="Postbox on Flick by Asplosh" style="width: 670px;">
        <img title="Postbox by asplosh" alt="Postbox" src="/content/images/blog/uk-post-box.jpg" />
    </a>
</div>

Enter the new service [Ernest Marples] [3] (named after the [postmaster general] [4] who invented the postcode) that 
aims to overcome this restriction by offering the public a postcode API free of charge.  Operating in a legal grey 
area, they don't host or cache the information (it is derived from undisclosed sources) but offer a public API to 
access it.

Of course, alternatives do exist.  [Numerous services] [5] offer public domain postcodes - postcodes that have been 
submitted by members of the public using GPS devices.  The drawback of these public domain services is that they 
are largely incomplete, and the accuracy of each postcode is not guaranteed to be correct.

###Free The Postcode

[Free the postcode] [6] operate a site that allows users to submit postcodes and their corresponding coordinates, 
as well as download the results collected so far (7557 at the time of writing).  If you feel like adding the database, 
it is made even easier with the introduction of an [iPhone application] [7].

###New Popular Edition Maps

Based upon out of copyright Ordnance Survey maps, [New Popular Edition Maps] [8] provide a web based interface to 
view the UK as it was 50 years ago.  In addition to this, it is also possible to submit the location of your postcode
through the web interface.  This information is then available to download (43,887 postcodes at the time of writing) 
and use for your own purposes, as long as your not making a profit from them (see [the licence] [9])

###Locating Postboxes

Ever found yourself needing to post a letter but not know where the nearest postbox is?  This is a question that Matthew 
Somerville's [Locating Postboxes] [10] service aims to answer.  Using data derived from a [freedom of information request] [11], 
the service can look-up and find your nearest postbox.  A full list of all the available information (20,076 complete 
and partial postcodes so far) is available to download.

###Accessing Public Domain Postcodes

If you want to integrate postcode information into your .NET application, retrieving and parsing the information can be a 
pain.  Because of this I've written an **Online UK Postcode Finder** *(no longer available)* that supports all the main 
providers and provides a simple interface for your to query.  The library also includes handy functions to validate and 
calculate the distance between two postcodes.

    namespace Flipbit.Postcodes
    {
        /// <summary>
        /// Postcode Library Demo Program
        /// </summary>
        public class PostcodeDemo
        {
            /// <summary>
            /// Gets or sets the ernest marples service.
            /// </summary>
            public IPostcodeService ErnestMarplesService { get; set; }

            /// <summary>
            /// Gets or sets the free the postcode service.
            /// </summary>
            public IPostcodeService FreeThePostcodeService { get; set; }

            static void Main()
            {
                var buckinghamPalace = FreeThePostcodeService.Lookup("SW1A 1AA");
                var downingStreet = ErnestMarplesService.Lookup("SW1 2AA");

                var distance = new Distance(buckinghamPalace.Coordinates, 
                                            downingStreet.Coordinates);

                Console.WriteLine("Buckingham Palace to 10 Downing St:");
                Console.WriteLine("{0} miles", distance.Miles);            
            }
        }
    }

  [1]: http://en.wikipedia.org/wiki/Postal_codes_in_the_United_Kingdom "Postal codes in the United Kingdom"
  [2]: http://www.guardian.co.uk/technology/2009/jul/22/free-our-data"> "Free out data: Web developers working to make postcode data freely available"
  [3]: http://ernestmarples.com/ "Ernest Marples' Postcode Latitude/Longitude Coordinates Lookup API"
  [4]: http://en.wikipedia.org/wiki/Ernest_Marples "Ernest Marples - Wikipedia"
  [5]: http://www.freeourdata.org.uk/blog/?p=73 "In the Guardian: people are doing it for themselves"
  [6]: http://www.freethepostcode.org/  "Free The Postcode! - Public Domain UK Postcodes"
  [7]: http://blog.johnmckerrell.com/ifreethepostcode/ "iFreeThePostcode iPhone Application"
  [8]: http://www.npemap.org.uk/  "New Popular Edition Maps - npemap.org.uk"
  [9]: http://www.npemap.org.uk/tileLicence.html "Tile Licence - npemap.org.uk"
 [10]: http://www.dracos.co.uk/play/locating-postboxes/ "Locating Postboxes - Dracos.co.uk"
 [11]: http://www.whatdotheyknow.com/request/location_of_every_post_box_that "Location of every post box that the Royal Mail Group operates - WhatDoTheyKnow"