import { ChevronLeft, Search } from 'lucide-react';
import SearchUserBookingsForm from '../../components/forms/SearchUserBookingsForm.jsx';
import ListBooking from '../../components/ListBooking.jsx';
import { useAuthContext } from '../../hooks/useAuthContext.jsx';
import '../../styles/UserPages.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function UserBookings() {
  const userBg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%232b4005' fill-opacity='0.26'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
  const { logoutRemoveToken } = useAuthContext()
  const navigate = useNavigate()
  const [openSearch, setOpenSearch] = useState(false)

  const handleLogout = () => {
    logoutRemoveToken()
    navigate('/login')
  }

  // TODO: add limit and paging to list

  return (
    <section className='user-section' style={{
      backgroundColor: "#d0dcc2",
      backgroundImage: userBg
    }}>

      <div className='content-container'>
        <div className="user-left">
          <span className='username'>USERNAME</span>
          <div className="user-nav">
            <Link to="/userbookings">My Bookings</Link>
            <Link to="/profile">Profile</Link>
            <a onClick={handleLogout}>Logout</a>
          </div>
        </div>
        <div className="user-middle">

          <div className='middle-heading'>
            <div className='h-full flex items-center'>
              <div className='px-4'>
                <ChevronLeft className='size-8 opacity-50' />
              </div>
              <h1 className='px-4'>My Bookings</h1>
            </div>

            <div className='h-full flex items-center p-4 active:bg-slate-50 select-none' onClick={() => setOpenSearch(!openSearch)}>
              <Search className='size-7 text-' />
            </div>
          </div>

          {
            openSearch &&
            <div className='middle-hidden'>
              <SearchUserBookingsForm />
            </div>
          }

          <div className='middle-content'>
            <ListBooking />
          </div>
        </div>
        <div className="user-right">
          <span>SEARCH</span>

        </div>
      </div>

    </section>
  )
}

export default UserBookings