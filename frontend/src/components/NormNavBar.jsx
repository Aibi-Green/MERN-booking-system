import { Menu } from "lucide-react"
import { useState } from "react"
import { useLocation } from "react-router-dom"

function NormNavBar() {
  const [hidden, setHidden] = useState(true)
  const location = useLocation()

  const handleMobileNavClick = () => {
    setHidden(!hidden)
  }

  const NormNavCss = "hover:bg-slate-100 w-[90px] h-full flex justify-center items-center"

  const NormNav = () => {
    return (
      <nav className='hidden md:flex md:items-center h-full'>
        <a href="#" className={NormNavCss}>Home</a>
        <a href="#" className={NormNavCss}>Gallery</a>
        <a href="#" className={NormNavCss}>Reviews</a>
        <a href="#" className={NormNavCss}>About</a>
      </nav>
    )
  }

  const MobileNormIcon = () => {
    return (
      <div className="h-full w-[60px] md:hidden flex justify-center items-center" onClick={handleMobileNavClick}>
        <Menu className="size-8" />
      </div>
    )
  }

  const MobileNormNav = () => {
    return (
      <div className={`bg-white md:hidden absolute w-[100%] pb-1 shadow-lg left-0 top-[60px]`}>
        <nav className='gap-2 flex flex-col text-center select-none'>
          <a href="#" className=" p-4 hover:bg-slate-50 uppercase tracking-widest">Home</a>
          <a href="#" className=" p-4 hover:bg-slate-50 uppercase tracking-widest">Gallery</a>
          <a href="#" className=" p-4 hover:bg-slate-50 uppercase tracking-widest">Reviews</a>
          <a href="#" className=" p-4 hover:bg-slate-50 uppercase tracking-widest">About Us</a>
          {
            (location.pathname != "/login") && (
              <div className="w-full flex flex-row">
                <a href="#" className="basis-[50%] p-4 bg-slate-300 hover:bg-slate-500 hover:text-white uppercase tracking-widest">Login</a>
                <a href="#" className="basis-[50%] p-4 bg-green-300 hover:bg-green-500 hover:text-white uppercase tracking-widest">Register</a>
              </div>
            )
          }
        </nav>
      </div>
    )
  }

  return (
    <div className="h-full basis-[50%] flex justify-end md:justify-center">
      <NormNav />
      <MobileNormIcon />
      {!hidden && <MobileNormNav />}
    </div>
  )
}

export default NormNavBar