import Logo from "./Logo"
import '../styles/NormFooter.css'
import { contacts } from "../assets/Data"

function NormFooter() {
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