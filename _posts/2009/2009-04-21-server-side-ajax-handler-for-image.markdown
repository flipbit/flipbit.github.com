---
layout: base
title: A server side AJAX handler for Image Annotations - flipbit.co.uk
title_short: A server side AJAX handler for Image Annotations
pretty_date: 21 April 2009
---

I’ve had a lot of questions asking for more details on writing a
server-side AJAX component for the [jQuery Image Annoation plugin][].
I’ve written a basic version of this for the [online demo][] in C\#
using [Monorail][], however it should easily translate into other
languages.

The first thing we need is a class in which to store our annotations,
for this I use the Annotation class.

    namespace Cogworks.Core.Domain
    {    
        /// <summary>    
        /// An <see cref="Annotation"/> stores some text in a specific
        /// location on an image.
        /// </summary>    
        public class Annotation
        {
            public string Id { get; set; }

            public int Left { get; set; }

            public int Top { get; set; }

            public int Width { get; set; }

            public int Height { get; set; }

            public string Editable { get; set; }

            public string Text { get; set; }

        }
    }

Next, I have method on a controller that creates some sample
annotations:

    /// <summary>
    /// Gets a list of <see cref="Annotation"/>
    /// </summary>
    [Layout(BlankLayoutKey)]
    public void Get(){    
        if (Session[AnnotationsKey] == null)    
        {        
            Annotations = AnnotationFactory.CreateSampleAnnotations();    
        }
        PropertyBag[AnnotationsKey] = Annotations;
    }

These annotations are then rendered for the browser using the [NVelocity
view engine][] to create a JSON stream:

    [
    #foreach($annotation in ${annotations})
       { "top": ${annotation.top},
         "left": ${annotation.left},
         "width": ${annotation.width},
         "height": ${annotation.height},
         "text": "${annotation.text}",
         "id": "${annotation.id}",
         "editable": ${annotation.editable}
     }
    #between 
        ,
    #end
    ]

Saving the annotations is a bit more complex. Each annotation has a
unique Id that is sent back and forth to the browser. When an annotation
is saved, it is important to delete the existing version from the
collection before saving the new one, otherwise the old annotations will
never get removed.

    /// <summary>
    /// Saves the specified annotation.
    /// </summary>
    public void Save(string id, int top, int left, int height, int width, string text)
    {
        DeleteAnnotation(id);

        Annotations.Add(AnnotationFactory.Create(text, left, top, width, height));

        CancelView();
    }

The save request doesn’t care what data is returned from the server – as
long as the HTTP response is OK (200). The current state of the
annotations is maintained by the plugin on the client side.

In non-rails based web frameworks, the code to get the changed variables
will probably look something like this:

    public void Save()
    {
        var id = Request.Form["id"];
        var top = Request.Form["top"];
        var left = Request.Form["left"];
        var height = Request.Form["height"];
        var width = Request.Form["width"];
        var text = Request.Form["text"];

        DeleteAnnotation(id);

        Annotations.Add(AnnotationFactory.Create(text, left, top, width, height));
    }

Deleting an annotation is much the same as saving, the plugin will
manage the state on the client and won’t error as long as the HTTP
response is 200. The code to delete the annotation on the server just
removes it from the collection.

    /// <summary>
    /// Deletes the specified annotation.
    /// </summary>
    /// <param name="id">The id.</param>
    public void Delete(string id)
    {
       DeleteAnnotation(id);

       CancelView();
    }

When the page is fully refreshed, the new annotations will be
re-displayed based upon the state of the data on the server.

  [jQuery Image Annoation plugin]: http://blog.cogworks.co.uk/2009/03/jquery-image-annotation-plugin.html     "Image Annotation Plugin for jQuery"
  [online demo]: http://www.cogworks.co.uk/annotation/index.html     "On-line demo of the jQuery Image Annotation Plugin"
  [Monorail]: http://www.castleproject.org/MonoRail/     "Monorail Rails Web Framework for ASP.NET"
  [NVelocity view engine]: http://nvelocity.sourceforge.net/    "NVelocity View Engine for .NET"