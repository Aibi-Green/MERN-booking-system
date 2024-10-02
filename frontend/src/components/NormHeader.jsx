import { useLocation } from "react-router-dom"
import LoginButton from "./buttons/LoginButton.jsx"
import RegisterButton from "./buttons/RegisterButton.jsx"
import Logo from "./Logo.jsx"
import NormNavBar from "./NormNavBar.jsx"

function NormHeader() {
  const location = useLocation()

  return (
    <header className="bg-white h-[60px] w-[100%] fixed z-10 shadow-lg top-0">
      <div className="bg-slate-0
      flex flex-row justify-between items-center
      max-w-[1500px] mx-auto pr-[10px]
      ">
        <Logo className="md:basis-[25%] md:justify-start" />
        <NormNavBar />

        <div className="hidden lg:flex flex-row gap-2 h-full py-2 lg:basis-[25%] lg:justify-end">
          {
            !(location.pathname == "/login" || location.pathname == "/register") &&
            <>
              <LoginButton isLink text="Sign In" className="w-[100px] rounded-lg" />
              <RegisterButton className="w-[100px] rounded-lg" />
            </>
          }
        </div>
      </div>
    </header>
  )
}

export default NormHeader