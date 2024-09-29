import { Menu } from "lucide-react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

function NormNavBar() {
  const [hidden, setHidden] = useState(true)
  const location = useLocation()

  const handleMobileNavClick = () => {
    setHidden(!hidden)
  }

  const NormNavCss = "hover:bg-slate-100 w-[110px] h-full flex justify-center items-center uppercase tracking-widest"

  const NormNav = () => {
    return (
      <nav className='hidden lg:flex lg:items-center h-full'>
        <Link to="/" className={NormNavCss}>Home</Link>
        <Link to="/" className={NormNavCss}>Gallery</Link>
        <Link to="/" className={NormNavCss}>Reviews</Link>
        <Link to="/" className={NormNavCss}>About</Link>
      </nav>
    )
  }

  const MobileNormIcon = () => {
    return (
      <div className="h-full w-[60px] lg:hidden flex justify-center items-center" onClick={handleMobileNavClick}>
        <Menu className="size-8" />
      </div>
    )
  }

  const MobileNormNav = () => {
    return (
      <div className={`bg-white lg:hidden absolute w-[100%] pb-1 shadow-lg left-0 top-[58px]`}>
        <nav className='gap-2 flex flex-col text-center select-none'>
          <Link to="/" className=" p-4 hover:bg-slate-50 uppercase tracking-widest">Home</Link>
          <Link to="/" className=" p-4 hover:bg-slate-50 uppercase tracking-widest">Gallery</Link>
          <Link to="/" className=" p-4 hover:bg-slate-50 uppercase tracking-widest">Reviews</Link>
          <Link to="/" className=" p-4 hover:bg-slate-50 uppercase tracking-widest">About Us</Link>
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
    <div className="h-full basis-[50%] flex justify-end lg:justify-center">
      <NormNav />
      <MobileNormIcon />
      {!hidden && <MobileNormNav />}
    </div>
  )
}

export default NormNavBar