// import { useState } from 'react'
import { CheckCircle, CircleDashed, EyeIcon, LucideEdit, LucideTrash, XCircle } from 'lucide-react';
import SearchUserBookings from '../components/searchUserBookings';
import AddBooking from '../components/AddBooking';
import { bookings } from '../assets/Data.jsx'

function UserBookings() {
  // TODO handle dates better cause it keeps adding one day
  // const [ searchPayload, setSearchPayload ] = useState({})

  const formatDate = (dateString) => {
    let options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }

    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  const formatTime = (dateString) => {
    let options = {
      hour: '2-digit',
      minute: '2-digit'
    }

    return new Date(dateString).toLocaleTimeString("en-US", options)
  }

  const formatStatus = (status) => {
    if (status == 0) {
      return (
        <div className='flex items-center text-yellow-500 font-bold select-none'>
          <CircleDashed className='mr-2 size-4' />
          <span className='text-sm'>Pending</span>
        </div>
      )
    } else if (status == 1) {
      return (
        <div className='flex items-center text-green-500 font-bold select-none'>
          <CheckCircle className='mr-2 size-4' />
          <span className='text-sm'>Approved</span>
        </div>
      )
    } else if (status == 2) {
      return (
        <div className='flex items-center text-red-500 font-bold select-none'>
          <XCircle className='mr-2 size-4' />
          <span className='text-sm'>Rejected</span>
        </div>
      )
    }
  }

  const viewRequirements = (id) => {
    console.log(bookings.find((i) => i._id === id));
  }

  const handleSearchPayload = (data) => {
    console.log(data);
  }

  return (
    <main>
      <section id="userBookingsSection" className='relative'>

        <div className='titleContainer'>
          <h1 id="userBookingsTitle">Bookings</h1>
          <hr />
        </div>

        <div className='contentContainer'>
          <SearchUserBookings onData={handleSearchPayload} />

          <div className='tableContainer'>
            {
              bookings.map((i) => (
                <div className='bookingItem' key={i._id}>
                  <div className='details'>
                    <span>{formatStatus(i.status)}</span>
                    <span className='text-sm opacity-80'>Date Requested: {formatDate(i.date_requested)}</span>
                    <span className='mt-2 text-lg font-bold capitalize'>{i.purpose}</span>
                    <div className='flex flex-row'>
                      <span className='mr-3 opacity-90'>From:</span><span>{formatDate(i.date_start)} {formatTime(i.date_start)}</span>
                    </div>
                    <div>
                      <span className='mr-8 opacity-90'>To:</span><span>{formatDate(i.date_end)} {formatTime(i.date_end)}</span>
                    </div>
                    <div>
                      <span className='opacity-90 mr-4'>Expected Guests:</span><span>{i.num_participants}</span>
                    </div>
                  </div>
                  <div className='operations'>
                    <button type='button' onClick={() => viewRequirements(i._id)} className='view'><EyeIcon /></button>
                    <button type='button' className='edit'><LucideEdit /></button>
                    <button type='button' className='delete'><LucideTrash /></button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        {/* <AddBooking /> */}

      </section>
    </main>
  )
}

export default UserBookings