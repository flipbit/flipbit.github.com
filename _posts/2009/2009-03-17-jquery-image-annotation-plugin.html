<div class="downloader floatRight"><a href="http://code.google.com/p/jquery-image-annotate/" title="Download the latest version of jQuery Image Annotate">Download</a>
<span>Released:
2nd April, 2009</span>
</div><p><a href="http://www.flickr.com/" title="Flickr Photo Sharing">Flickr</a> was the first site to widely introduce the concept of <a href="http://www.flickr.com/photos/robbaldwinphotography/3106245145/" title="Annotated photo example on Flickr">annotating images</a> with user comments.  This concept was first pioneered by the <a href="http://www.fotonotes.net/" title="JavaScript Fotonotes">Fotonotes JavaScript library</a>, and has since been further popularised by Web 2.0 sites like Facebook.
</p><p>When my current client asked my to integrate simlar functionality into there site, I started to look around for a jQuery plugin that could provide this, but none was available.  The <a href="http://drupal.org/project/image_annotate" title="Image Annotation Module for Drupal">Image Annotate library for Drupal</a> is based upon jQuery UI however, so taking this for a base, I adopted it to just use jQuery 1.2.6.
</p><p>You can see a <a href="http://www.cogworks.co.uk/annotation/index.html" title="jQuery Image Annotation Plugin Demo">live example here</a>.
</p><p>Using the plugin is straight forward, simply hookup the plugin an call the imageAnnotate function on the image you would like to annotate.
</p><pre name="code" class="xml:nocontrols">&lt;html&gt;
    &lt;head&gt;

        &lt;style type="text/css" media="all"&gt;@import "/css/annotation.css";&lt;/style&gt;
        &lt;script type="text/javascript" src="/js/jquery-1.2.6.min.js"&gt;&lt;/script&gt;
        &lt;script type="text/javascript" src="/js/jquery-ui-1.5.3.min.js"&gt;&lt;/script&gt;
        &lt;script type="text/javascript" src="/js/jquery.annotate.js"&gt;&lt;/script&gt;

        &lt;script language="javascript"&gt;

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

        &lt;/script&gt;

    &lt;/head&gt;
    &lt;body&gt;

        &lt;div class="main-content"&gt;
            &lt;img src="/images/annotated.jpg" id="toAnnotate" /&gt;
        &lt;/div&gt;

    &lt;/body&gt;
&lt;/html&gt;
</pre><p>The plugin requires jQuery 1.2.6 and jQuery UI with resiable and draggable options included.  A saveAsHtml method is available in order to generate a dynamic HTML form with which to save the annotations back to the server.
</p><h3>AJAX Version
</h3><p><strong>EDIT:</strong> <a href="/2009/04/server-side-ajax-handler-for-image.html" title="Server Side AJAX Handler">see this post for server side code</a>.
</p><p>As well as operating in a static HTML mode, the plugin can load, update and delete annotations using AJAX calls.  Specifying Get, Save and Delete URLs, plus setting the useAjax flag to true.
</p><pre name="code" class="csharp:nocontrols">$(window).load(function() {
                $("#toAnnotate").annotateImage({
                    getUrl: "get.rails",
                    saveUrl: "save.rails",
                    deleteUrl: "delete.rails",
                    useAjax: true
                });
            });
</pre><p>The Get url expects data to be returned as an JSON stream.
</p><pre name="code" class="csharp:nocontrols">[ { "top": 286,
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
</pre><h3>Window Load Event
</h3><p>When calling the plugin it is important to use the $(window).load() event.  This event fires after the page an all it's images have loaded.  The $(document).ready() event fires after the page has loaded, but before the browser has retrieved all the images.  Calling the plugin in this event will result in the plugin rending a blank DIV as the image hasn't loaded.
</p>