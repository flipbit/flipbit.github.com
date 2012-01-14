---
layout: base
title: Virtual Members and the Null Object pattern - flipbit.co.uk
title_short: Virtual Members and the Null Object pattern
pretty_date: 9 March 2009
---

I’ve recently been working on a series of
<acronym title="Create Read Update Delete">CRUD</acronym> screens for a
client using the <acronym title="Model View Controller">MVC</acronym>
pattern. Each of my controllers is validated on the server side by an
instance of a separate class implementing the *IValidator* interface,
enabling me to test the validation separately from the controller
logic.  

    namespace Cogworks.Web
    {
        public abstract class AbstractController : Controller
        {
            /// 
            /// Gets the validator for this controller.
            /// 
            /// The validator.
            public virtual IValidator Validator { get; private set; }

            /// 
            /// Initializes a new instance of the AbstractController class.
            /// 
            public AbstractController()
            {
                Validator = new NullValidator();
            }
        }
    }

In the abstract base class I set the validator to be an instance of
NullValidator, as not all controllers require validation. The
NullValidator always returns true and means that my controller code
isn’t concerned with checking for null reference errors before calling
the validator (see the [Null Object Pattern][]).  

    namespace Cogworks.Web
    {
        public class NullValidator : IValidator
        {
            public void Validate(AbstractWebContext context)
            {
            }

            public bool Valid
            {
                get { return true; }
            }

            public string Message
            {
                get { return string.Empty; }
            }
        }
    }

When coding however, the intellisense comes up with the error **“Do not
call overridable methods in constructors”** when I assign the
NullValidator as the default IValidator type. After a bit of research,
[this article on MSDN explains why][] - doing so could call the base
property from the base constructor under certain conditions.  

Refactoring the code, I new up a NullValidator on the explicit call to
the property, nicely avoiding the above scenario.  

    namespace Cogworks.Web
    {
        public abstract class AbstractController : Controller
        {
            /// 
            /// Gets the validator for this controller.
            /// 
            /// The validator.
            public virtual IValidator Validator { get { return new NullValidator(); } }
        }
    }

Now, inheriting controllers can override the property and assign there
own custom validation.  

Whilst this approach is certainly better than the first, it could still
be improved upon by using the
<acronym title="Inversion of Control">IoC</acronym> container to
automatically set the validator properties for me - enabling me to set
the validation through configuration rather than hard coding it.
Unfortunatley the system I’m using doesn’t allow me to pull the
controllers out of configuration, so I’ll have to settle for this
implementation.  

  [Null Object Pattern]: http://en.wikipedia.org/wiki/Null_Object_pattern     "The Null Object Pattern"
  [this article on MSDN explains why]: http://msdn.microsoft.com/en-us/library/ms182331(VS.80).aspx     "Do not call overridable methods in constructors on MSDN"