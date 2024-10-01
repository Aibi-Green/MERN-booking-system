import Logo from "./Logo"
import '../styles/NormFooter.css'

function NormFooter() {
  const contacts = [
    {
      title: "Contact Numbers",
      items: ["(555) 123-4567", "(555) 987-6543", "(555) 234-7890"]
    }, {
      title: "Email",
      items: ["info@harmonyheights.com"]
    }, {
      title: "Location",
      items: ["1234 Maplewood Lane, Apt 56B, Springtown, CA 90210, USA"]
    }
  ]

  return (
    <footer>
      <div className="content-container">
        <div id="footer-first-div">
          {/* <div></div> */}
          <Logo white={true} />
          <div id="contact-container">

            {
              contacts.map((contact, i) => (
                <div key={i} className="contact-div">
                  <span className="contact-title">{contact.title}</span>
                  {
                    contact.items.map((item, i) => (
                      <span key={i} className="contact-item">{item}</span>
                    ))
                  }
                </div>
              ))
            }

          </div>
        </div>

        <hr className="h-[2px] bg-slate-400" />

        <div id="copyright">
          <span>{"© Harmony Heights, Inc. 2024."}</span>
        </div>
      </div>
    </footer>
  )
}

export default NormFooter