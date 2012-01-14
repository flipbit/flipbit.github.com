---
layout: base
title: Introducing Hudson Monitor - flipbit.co.uk
title_short: Introducing Hudson Monitor
pretty_date: 15th July 2009
---

The [Hudson Continuous Integration] [1] server has been my continuous
integration platform of choice for about a year now, mainly because of
it’s ease of use and configurability.

Whilst working on a project for a client last year, I needed to monitor
the status of the build whenever someone checked in. There are [numerous
ways] [2] of achieving this already, however we wanted a separate PC
running next to the team with a full-screen display letting everyone
know the build status.

### Accessing Hudson with .NET

To achieve this task I wrote a .NET wrapper for the [Hudson Remote
API] [3]. This RESTful API enables a program to query the status and
history of the builds running on the Hudson server. An ASP.NET MVC
application then takes this information and displays it on a webpage
that can be run full-screen in a browser.

<div class="center">
    <img alt="A rich domain model" src="/content/images/blog/hudson-monitor-on-big-screen.jpg" />
</div>

It is much easier to quickly see the status of the build on the 40 inch
display rather than through the default web interface or a tray icon!

The monitor displays information such as build number, subversion
revision and the check-in comments. If an image with the same name as
the user checking in the code exists on the server, their avatar is
displayed. This [obfuscates who did the build to the outside world] [4].

We found that displaying the avatar of the last user also was a strong
encouragement for developers to check that the build wasn’t broken
before checking in their own code.

### Downloading the Monitors and Source Code

I’ve recently revisited the code and re-written it from scratch, adding
more robust unit tests and support for a WPF monitor running in the
system tray or Windows 7 Superbar. All the code is [open sourced on
Google code] [5].

  [1]: https://hudson.dev.java.net/                                             "hudson: an extensible continuous integration engine"
  [2]: http://wiki.hudson-ci.org/display/HUDSON/Hudson+Tray+Application         "Hudson Tray Notification"
  [3]: http://wiki.hudson-ci.org/display/HUDSON/Remote+access+API               "Hudson Remote Access API"
  [4]: http://blog.cogworks.co.uk/2009/06/build-avatars-in-agile-teams.html     "Build Avatars in Agile Teams"
  [5]: https://github.com/flipbit/jenkins.net                                   "Jenkins .NET Library"
