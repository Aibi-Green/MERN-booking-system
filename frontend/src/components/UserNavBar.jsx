import { ChevronDown } from 'lucide-react';
import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

function UserNavBar() {
  const [open, setOpen] = useState(false)
  const { logoutRemoveToken } = useAuthContext()
  const navigate = useNavigate()

  const handleLogout = () => {
    logoutRemoveToken()
    navigate('/login')
  }

  const showUserNav = () => {
    setOpen(!open)
  }

  const UserNav = () => {
    return(
      <nav id="userNav" className='flex'>
        <a onClick={() => navigate('/userbookings')}>Bookings</a>
        <a onClick={() => navigate('/editprofile')}>Profile</a>
        <a onClick={handleLogout}>Log Out</a>
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