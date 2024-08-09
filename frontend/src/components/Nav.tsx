import { useState } from "react"
import { NavLink } from "react-router-dom"
import { Button } from "./ui/button"
import { Menu, X } from "lucide-react"

const NavLinks = () => {
    const navLinkStyle = "py-4 text-lg text-slate-200 hover:text-white"
    return (<>
        <NavLink to="/" className={navLinkStyle}>Home</NavLink>
        <NavLink to="/reviews" className={navLinkStyle}>Reviews</NavLink>
        <NavLink to="/gallery" className={navLinkStyle}>Gallery</NavLink>
        <NavLink to="/about-us" className={navLinkStyle}>About Us</NavLink>
        <NavLink to="/login" className={navLinkStyle}>Login</NavLink>
    </>)
}

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleNavBar = () => {
        setIsOpen(!isOpen)
    }

    return (<>
        <nav className="w-2/3">
            <div className="flex flex-row justify-between hidden md:flex">
                <NavLinks />
            </div>
            <div className="md:hidden flex justify-end">
                <Button variant={"ghost"} className="cursor-pointer px-0 py-7 
                hover:bg-transparent text-slate-300 hover:text-white" 
                onClick={toggleNavBar}>
                    {isOpen ? <X /> : <Menu />}
                </Button>
            </div>
        </nav>
        {isOpen && (
            <div className="flex basis-full flex-col items-center w-full md:hidden">
                <NavLinks />
            </div>
        )}
    </>)
}

export default Nav