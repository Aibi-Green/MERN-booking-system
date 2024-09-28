import { ChevronDown } from 'lucide-react';
import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext';
import { Link, useNavigate } from 'react-router-dom';

function UserNavBar() {
  const [open, setOpen] = useState(false)
  const { logoutRemoveToken } = useAuthContext()
  const navigate = useNavigate()
  const {email} = useAuthContext()

  const handleLogout = () => {
    logoutRemoveToken()
    navigate('/login')
  }

  const UserNav = () => {
    return(
      <nav id="userNav" className='flex'>
        <Link to='/userbookings'>Bookings</Link>
        <Link to='/editprofile'>Profile</Link>
        <a onClick={handleLogout}>Log Out</a>
      </nav>
    )
  }

  const UserMenu = () => {
    return(
      <div id='userMenu'>
        <span className="">{email}</span>
        <ChevronDown className="ml-3 inline-block select-none" onClick={() => setOpen(!open)} />
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