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
      h-[100%] w-full m-auto
      md:w-[85%]
      lg:w-[85%]
      xl:w-[85%]
      2xl:w-[75%]
      ">
        <Logo className="md:basis-[25%] md:justify-start" />
        <NormNavBar />

        <div className="hidden lg:flex flex-row gap-2 h-full py-2 lg:basis-[25%] lg:justify-end">
          {
            (location.pathname != "/login") &&
            <>
              <LoginButton className="w-[80px] rounded-lg" />
              <RegisterButton className="w-[80px] rounded-lg" />
            </>
          }
        </div>
      </div>
    </header>
  )
}

export default NormHeader