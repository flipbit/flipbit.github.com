---
layout: base
title: Microprinting - flipbit.co.uk
title_short: Microprinting
---

<h2>Microprinting</h2>
<hr />

<div class="image-center">
    <a href="http://www.flickr.com/photos/25796600@N02/3920216909/" title="Microprinter on Flickr" style="width: 506px;">
        <img src="http://farm4.static.flickr.com/3529/3920216909_90d7b3f8e5.jpg" alt="Optional title" />
    </a>
</div>

The concept of [Microprinting] [1] as described by [Tom Taylor] [2] as:

<blockquote>
    <p>
        an experiment in physical activity streams and notification, using a repurposed receipt printer 
        connected to the web.
    </p>
    <small>Tom Taylor</small>
</blockquote>

Using this and the [works] [3] of [others] [4] as inspiration, I set about making my own Internet connected printer.

Before starting the project, I hadn't had any previous experience of building electronic circuits, 
and it had been over 10 years since I had last picked up a soldering iron.  Unperturbed, I set out and 
acquired everything I needed for the project:

* An old receipt printer - I have a Citizen CBM-231 from [ebay] [5]
* An [Arduino] [6] board, bread board and jump wires (from [Cool Components] [7])
* Arduino Ethernet shield (also from [Cool Components] [8])
* A MAX233 Chip and serial plug (from [Maplins] [9])

The serial output of the Arduino board isn't natively compatible with the printer - you need to run 
the signal through the MAX233 chip to transform the output to the correct voltage.

Hooking Up The Printer
----------------------

<hr/>

Before turning on the soldering iron and start connecting wires, it would be a good idea to study 
the manuals for the [printer] [10] and [MAX233 chip] [11].  I did not and subsequently spent a couple 
of hours achieving very little before finally get the printer to spark into life.

The first thing I needed to find out was the numbering on the pins of the MAX233 chip - a quick bit of 
searching revealed that pin 1 is next to the corner with the dot in.  Using the bread board to 
create a quick circuit, wiring in the chip was quite easy, although the finished article looks quite complicated:

<div class="image-center">
    <a href="http://www.flickr.com/photos/25796600@N02/3920214229/in/photostream/" title="Arduino on Flickr" style="width: 506px">
	    <img src="http://farm3.static.flickr.com/2480/3920214229_d122f3de76.jpg" alt="Arduino on Flickr" width="500" height="289" />
    </a>
</div>
			
After plugging in the board, the printer started to emit a constant stream of question marks (I'm not the 
first one [this happened to] [12]).  Going back and checking the wires produced the desired result, and I 
was able to print my basic "Hello World" test program.

<div class="image-center">
    <a href="http://www.flickr.com/photos/25796600@N02/3920215311/in/photostream/" title="Connecting it up" style="width: 506px;">
	    <img src="http://farm3.static.flickr.com/2556/3920215311_6cfe2775bc.jpg" alt="Connecting it up" width="500" height="307" />
    </a>
</div>

In order to help anyone else, I've made a completely non technical diagram of the circuit I'm using:

<div class="image-center">
    <img src="/content/images/blog/max233-circuit-diagram.jpg" alt="MAX233 Circuit Diagram" width="401" height="398" />
</div>

When connected to the laptop, the Arduino is powered through the USB cable.  In order to untether 
the printer from the laptop, you can connect a power adapter directly to the Arduino board itself.  
I'm using a spare iPhone power adapter and USB cable which seems to work quite well too.

Programming The Arduino
-----------------------

<hr/>

Programming the Arduino is a simple matter of downloading the [open source IDE] [13] 
and writing a <em>"sketch"</em> - a small program to run on the board independently of the connected computer.  
When plugging in the board, it appears on the host computer as an additional serial port.  Once you've 
finished writing your sketch, you can compile and upload it directly to the board from the IDE.

I wrote a "Hello World" test program based upon [Roo Reynolds code] [14] 
just to check the board was wired up correctly.  Once this was up and running, [Tom Taylor has a version] [15]
that includes Ethernet networking to accept data using HTTP GET requests.

I wrote a simple queue in .NET Monorail that spools the contents of a text file to the printer.  Several command 
line programs append data to this text file to populate the queue withincoming streams from email and RSS feeds.  
The printer calls this queue every minute and prints the contents.

The Finished Result
-------------------

<hr/>

<div class="image-center">
    <a href="http://www.flickr.com/photos/25796600@N02/3942168170/in/photostream/" title="Tube Status Report" style="width: 321px;">
        <img src="http://farm3.static.flickr.com/2676/3942168170_aaf7471f67.jpg" alt="Tube Status Report" width="315" height="500" />
    </a>
</div>

The printer is currently pooling information from the following sources:

* Google Mail accounts
* Weather Reports from the BBC
* Tube reports from TFL
* Google Analytics statistics
* RSS Feeds

I'm hoping to expand the incoming information sources over time.

  [1]: http://microprinter.pbworks.com/ "Microprinter / Frontpage / pbworks"
  [2]: http://tomtaylor.co.uk/projects/microprinter/ "Tom Taylor : Projects : Microprinter"
  [3]: http://rooreynolds.com/2009/02/01/microprinter/ "Microprinter &#8211; Roo Reynolds"
  [4]: http://www.colmmcmullan.net/blog/2009/03/26/wires-and-magic/ "colmmcmullan.net :: wires and magic"
  [5]: http://business.shop.ebay.co.uk/Retail-Shop-Fitting-/11890/i.html?_nkw=receipt+printer&amp;_catref=1&amp;_fln=1&amp;_trksid=p3286.c0.m282 "receipt printer, Point of Sale POS Equipment, Cash Registers Supplies items at low prices on eBay.co.uk"
  [6]: http://www.arduino.cc/ "Arduino Homepage"
  [7]: http://www.coolcomponents.co.uk/catalog/product_info.php?cPath=50&amp;products_id=115 "Arduino Duemilanove (Updated 328 Version) from Cool Components"
  [8]: http://www.coolcomponents.co.uk/catalog/product_info.php?cPath=50&amp;products_id=232 "Ethernet Shield from Cool Components"
  [9]: http://www.maplin.co.uk/Module.aspx?ModuleNo=17727 "MAX233CPP +5V Powered RS-232 Driver/Receiver : RS232/233/422 : Maplin"
 [10]: http://www.goodson.com.au/download/manual/cbm/user/CBM230_231%20User%20Manual.pdf "Citizen CBM-231 Printer Manual"
 [11]: http://pdf1.alldatasheet.com/datasheet-pdf/view/73050/MAXIM/MAX233.html "MAX233 Chip Diagram"
 [12]: http://www.flickr.com/photos/rooreynolds/3243823247/in/set-72157613168262749/ "Just as well it can be recycled"
 [13]: http://arduino.cc/en/Main/Software "Download the Arduino Software"
 [14]: http://github.com/rooreynolds/microprinter/tree/master" "rooreynolds's microprinter at master - GitHub"
 [15]: http://github.com/tomtaylor/microprinter-arduino/tree/master "tomtaylor's microprinter-arduino at master - GitHub"