import { Menu } from "lucide-react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

function NormNavBar() {
  const [hidden, setHidden] = useState(true)
  const location = useLocation()

  const handleMobileNavClick = () => {
    setHidden(!hidden)
  }

  const NormNavCss = "hover:bg-lime-200 w-[110px] h-full flex justify-center items-center uppercase tracking-widest rounded-lg"

  const Links = ["home", "gallery", "reviews", "about"]

  const NormNav = () => {
    return (
      <nav className='hidden lg:flex lg:items-center h-full'>
        {
          Links.map((name, i) => (
            <Link key={i} to={`/#${name}`} 
            // onClick={() => handleScroll(name)} 
            className={NormNavCss}>{name}</Link>
          ))
        }
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
          {
            Links.map((name, i) => (
              <Link key={i} to={`/#${name}`} className=" p-4 hover:bg-slate-50 uppercase tracking-widest">{name}</Link>
            ))
          }
          {
            !(location.pathname == "/login" || location.pathname == "/register") && (
              <div className="w-full flex flex-row">
                <Link to="/login" className="basis-[50%] p-4 bg-slate-300 hover:bg-slate-500 hover:text-white uppercase tracking-widest">Login</Link>
                <Link to="/register" href="#" className="basis-[50%] p-4 bg-green-300 hover:bg-green-500 hover:text-white uppercase tracking-widest">Register</Link>
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