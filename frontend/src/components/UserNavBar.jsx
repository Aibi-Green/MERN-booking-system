import { ChevronDown } from 'lucide-react';
import { useState } from 'react'

function UserNavBar() {
  const [open, setOpen] = useState(false)

  const showUserNav = () => {
    setOpen(!open)
  }

  const UserNav = () => {
    return(
      <nav id="userNav" className='flex'>
        <a href="#">Profile</a>
        <a href="#">Log Out</a>
      </nav>
    )
  }

  const UserMenu = () => {
    return(
      <div id='userMenu'>
        Welcome Back, <span className="temp">Temporary</span>
        <ChevronDown className="ml-3 inline-block select-none" onClick={showUserNav} />
      </div>
    )
  }
  return (
    <div className="relative">
      <UserMenu />
      {open && <UserNav />}
    </div>
  )
}

export default UserNavBar