---
layout: base
title: Anemic Domain Models vs the Single Responsibility Principle - flipbit.co.uk
title_short: Anemic Domain Models vs the Single Responsibility Principle
pretty_date: 16th July 2009
---

One discussion I keep hearing come up [again][1] and [again][2] in the
blogosphere, as well as in the pub, is that of the [anemic domain model
as an anti-pattern][3].

Whilst I can see the benefits of having a "full-fat" domain model, it
seems to go against the [Single Responsibility Principle][4] (SRP). This
is wonderfully illustrated by Robert Martin on the [Hanselminutes
podcast][5], about 3 minutes in. In this podcast Martin argues against
having an object having multiple reason to change.

<div class="center">
    <img alt="A rich domain model" src="/content/images/blog/rich-domain-model.jpg" />
</div>

In this example, the employee class knows too much about it's
construction and persistence. This can be [easily addressed][6] using
standard Domain Driven Design (DDD) Factory and Repository patterns:

<div class="center">
    <img alt="A domain driven design inspired domain model" src="/content/images/blog/domain-driven-design-domain-model.jpg" />
</div>

However, we're still left with the employee object having multiple
responsibilities, and multiple reasons to change. Some argue that this
is a [good thing][7], however I think that particular example is more an
illustration of the [Liskov Substitution Principle][8].

Following Robert Martin's example to its logical conclusion, we end up
with an service-oriented architecture (SoA) approach, and an Anemic
Domain Model.

<div class="center">
    <img alt="An anemic domain model" src="/content/images/blog/anemic-domain-model.jpg" />
</div>

<p>
    So which approach would I use? A rich domain model or an anemic one,
    with an <acronym title="Service-oriented Architecture">SoA</acronym> and
    <acronym title="Single Responsibility Principle">SRP</acronym>? In my
    opinion it is easier to write a loosely coupled, testable, anemic domain
    with an <acronym title="Service-oriented Architecture">SoA</acronym>,
    than it is to write a full interactive domain. By using the
    <acronym title="Service-oriented Architecture">SoA</acronym> approach,
    you can essentially defer the question, "when should I split this
    functionality into another class?" - it is answered for you by the
    <acronym title="Single Responsibility Principle">SRP</acronym>.
</p>
   
<p>
    With a greater level of skill required to write a good rich domain
    model, I tend to go for the anemic option when possible - it is easier
    to point to the
    <acronym title="Single Responsibility Principle">SRP</acronym> than it
    is to count on good OO design acumen. Of course, this depends on the
    project your working on and the people your working with.
</p>

  [1]: http://codebetter.com/blogs/gregyoung/archive/2009/07/15/the-anemic-domain-model-pattern.aspx    "The Anemic Domain Model Pattern"
  [2]: http://blog.decayingcode.com/2009/02/anti-pattern-anemic-domain-model.html                           "Anti-Pattern: Anemic Domain Model"
  [3]: http://martinfowler.com/bliki/AnemicDomainModel.htm             "AnemicDomainModel on MartinFowler.com"
  [4]: http://en.wikipedia.org/wiki/Single_responsibility_principl            "Single Responsibility Principle on Wikipedia"
  [5]: http://www.hanselminutes.com/default.aspx?showID=16                              "Show 145: SOLID Principles with Uncle Bob - Robert C. Martin"
  [6]: http://stackoverflow.com/questions/227856/how-to-avoid-anemic-domain-models-and-maintain-separation-of-concerns "How to avoid Anemic Domain Models and maintain Separation of Concerns?"
  [7]: http://vitamic.wordpress.com/2007/01/04/anemic-domain-model-illustrated/ "Anemic Domain Model Illustrated"
  [8]: http://en.wikipedia.org/wiki/Liskov_substitution_principle "Liskov Substitution Principle on Wikipedia"
