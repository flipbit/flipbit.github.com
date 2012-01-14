---
layout: base
title: jQuery Image Annotation Plugin - flipbit.co.uk
title_short: jQuery Image Annotation Plugin
pretty_date: 17 March 2009
---

[Flickr][] was the first site to widely introduce the concept of
[annotating images][] with user comments. This concept was first
pioneered by the [Fotonotes JavaScript library][], and has since been
further popularised by Web 2.0 sites like Facebook.

When my current client asked my to integrate simlar functionality into
there site, I started to look around for a jQuery plugin that could
provide this, but none was available. The [Image Annotate library for
Drupal][] is based upon jQuery UI however, so taking this for a base, I
adopted it to just use jQuery 1.2.6.

You can see a [live example here][].

Using the plugin is straight forward, simply hookup the plugin an call
the imageAnnotate function on the image you would like to annotate.

    <html>
        <head>

            <style type="text/css" media="all">@import "/css/annotation.css";</style>
            <script type="text/javascript" src="/js/jquery-1.2.6.min.js"></script>
            <script type="text/javascript" src="/js/jquery-ui-1.5.3.min.js"></script>
            <script type="text/javascript" src="/js/jquery.annotate.js"></script>

            <script language="javascript">

                $(window).load(function() {

                   $("#toAnnotate").annotateImage({
                        editable: true,
                        useAjax: false,
                        notes: [ { "top": 286, 
                                   "left": 161, 
                                   "width": 52, 
                                   "height": 37, 
                                   "text": "A read only annotation", 
                                   "editable": false },
                                 { "top": 134, 
                                   "left": 179, 
                                   "width": 68, 
                                   "height": 74, 
                                   "text": "An editable annotation", 
                                   "editable": true } ]                    
                    });

                });

            </script>

        </head>
        <body>

            <div class="main-content">
                <img src="/images/annotated.jpg" id="toAnnotate" />
            </div>

        </body>
    </html>

The plugin requires jQuery 1.2.6 and jQuery UI with resiable and
draggable options included. A saveAsHtml method is available in order to
generate a dynamic HTML form with which to save the annotations back to
the server.

### AJAX Version

**EDIT:** [see this post for server side code][].

As well as operating in a static HTML mode, the plugin can load, update
and delete annotations using AJAX calls. Specifying Get, Save and Delete
URLs, plus setting the useAjax flag to true.

    $(window).load(function() {
                    $("#toAnnotate").annotateImage({
                        getUrl: "get.rails",
                        saveUrl: "save.rails",
                        deleteUrl: "delete.rails",
                        useAjax: true
                    });
                });

The Get url expects data to be returned as an JSON stream.

    [ { "top": 286,
        "left": 161,
        "width": 52,
        "height": 37,
        "text": "Small people on the steps",
        "id": "e69213d0-2eef-40fa-a04b-0ed998f9f1f5",
        "editable": false },
      { "top": 134,
        "left": 179,
        "width": 68,
        "height": 74,
        "text": "National Gallery Dome",
        "id": "e7f44ac5-bcf2-412d-b440-6dbb8b19ffbe",
        "editable": true } ]   

### Window Load Event

When calling the plugin it is important to use the $(window).load()
event. This event fires after the page an all it’s images have loaded.
The $(document).ready() event fires after the page has loaded, but
before the browser has retrieved all the images. Calling the plugin in
this event will result in the plugin rending a blank DIV as the image
hasn’t loaded.

  [Download]: http://code.google.com/p/jquery-image-annotate/     "Download the latest version of jQuery Image Annotate"
  [Flickr]: http://www.flickr.com/ "Flickr Photo Sharing"
  [annotating images]: http://www.flickr.com/photos/robbaldwinphotography/3106245145/     "Annotated photo example on Flickr"
  [Fotonotes JavaScript library]: http://www.fotonotes.net/     "JavaScript Fotonotes"
  [Image Annotate library for Drupal]: http://drupal.org/project/image_annotate     "Image Annotation Module for Drupal"
  [live example here]: http://www.cogworks.co.uk/annotation/index.html     "jQuery Image Annotation Plugin Demo"
  [see this post for server side code]: /2009/04/server-side-ajax-handler-for-image.html     "Server Side AJAX Handler"