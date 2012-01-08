<p>I've recently been working on a series of <acronym title="Create Read Update Delete">CRUD</acronym> screens for a client using the <acronym title="Model View Controller">MVC</acronym> pattern.  Each of my controllers is validated on the server side by an instance of a separate class implementing the <i>IValidator</i> interface, enabling me to test the validation separately from the controller logic.<br />
</p><pre name="code" class="csharp:nocontrols">namespace Cogworks.Web
{
    public abstract class AbstractController : Controller
    {
        /// <summary>
        /// Gets the validator for this controller.
        /// </summary>
        /// <value>The validator.</value>
        public virtual IValidator Validator { get; private set; }

        /// <summary>
        /// Initializes a new instance of the AbstractController class.
        /// </summary>
        public AbstractController()
        {
            Validator = new NullValidator();
        }
    }
}
</pre><p>In the abstract base class I set the validator to be an instance of NullValidator, as not all controllers require validation.  The NullValidator always returns true and means that my controller code isn't concerned with checking for null reference errors before calling the validator (see the <a rel="nofollow" title="The Null Object Pattern" href="http://en.wikipedia.org/wiki/Null_Object_pattern">Null Object Pattern</a>).<br />
</p><pre name="code" class="csharp:nocontrols">namespace Cogworks.Web
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
</pre><p>When coding however, the intellisense comes up with the error <b>"Do not call overridable methods in constructors"</b> when I assign the NullValidator as the default IValidator type.  After a bit of research, <a href="http://msdn.microsoft.com/en-us/library/ms182331(VS.80).aspx" rel="nofollow" title="Do not call overridable methods in constructors on MSDN">this article on MSDN explains why</a> - doing so could call the base property from the base constructor under certain conditions.<br />
</p><p>Refactoring the code, I new up a NullValidator on the explicit call to the property, nicely avoiding the above scenario.<br />
</p><pre name="code" class="csharp:nocontrols">namespace Cogworks.Web
{
    public abstract class AbstractController : Controller
    {
        /// <summary>
        /// Gets the validator for this controller.
        /// </summary>
        /// <value>The validator.</value>
        public virtual IValidator Validator { get { return new NullValidator(); } }
    }
}
</pre><p>Now, inheriting controllers can override the property and assign there own custom validation.<br />
</p><p>Whilst this approach is certainly better than the first, it could still be improved upon by using the <acronym title="Inversion of Control">IoC</acronym> container to automatically set the validator properties for me - enabling me to set the validation through configuration rather than hard coding it.  Unfortunatley the system I'm using doesn't allow me to pull the controllers out of configuration, so I'll have to settle for this implementation.<br />
</p>