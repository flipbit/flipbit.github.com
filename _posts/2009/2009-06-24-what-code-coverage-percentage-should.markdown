---
layout: base
title: What Code Coverage percentage should you aim for? - flipbit.co.uk
title_short: What coverage percentage should you aim for?
pretty_date: 24 June 2009
---

How many unit tests should you write for your code? 100%? 50%? It could
depend where abouts you are in the [7 phases of unit testing][].

I dislike 100% coverage as I think it says more about the time you have
at hand to write tests, even though some [support the idea][]. As a rule
of thumb, I prefer is to say that half the code you write should be test
code, and that this will naturally be skewed towards the more complex
areas of your system.

But then how do you test all those getters and setters? I usually find
these fall out in testing Domain and Model object mappings, or in data
access testing. The message is to get the coverage up by doing
functional testing, rather than purely coverage improving testing.

  [7 phases of unit testing]: http://codebetter.com/blogs/karlseguin/archive/2009/04/27/the-7-phases-of-unit-testing.aspx
  [support the idea]: http://codebetter.com/blogs/patricksmacchia/archive/2009/06/13/i-love-100-coverage.aspx