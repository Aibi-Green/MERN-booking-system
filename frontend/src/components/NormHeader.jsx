import { useLocation } from "react-router-dom"
import LoginButton from "./buttons/LoginButton.jsx"
import RegisterButton from "./buttons/RegisterButton.jsx"
import Logo from "./Logo.jsx"
import NormNavBar from "./NormNavBar.jsx"
import { useEffect, useState } from "react"

function NormHeader() {
  const location = useLocation()
  const [currentlyInLogInRegisterPage, setCurrentlyInLogInRegisterPage] = useState(false)

  useEffect(() => {
    if (location.pathname == "/login")
      setCurrentlyInLogInRegisterPage(true)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <header className="bg-white h-[60px] w-[100%] fixed z-10 shadow-lg">
      <div className="bg-slate-0
      flex flex-row justify-between items-center
      h-[100%] w-full m-auto
      md:w-[85%]
      lg:w-[85%]
      xl:w-[85%]
      2xl:w-[75%]
      ">
        <Logo />
        <NormNavBar />

        <div className="hidden lg:flex flex-row gap-2 h-full py-2 lg:basis-[25%] lg:justify-end">
          {!currentlyInLogInRegisterPage && (
            <LoginButton className="w-[80px] rounded-lg" />
          )}
          {!currentlyInLogInRegisterPage && (
            <RegisterButton className="w-[80px] rounded-lg" />
          )}
        </div>
      </div>
    </header>
  )
}

export default NormHeader