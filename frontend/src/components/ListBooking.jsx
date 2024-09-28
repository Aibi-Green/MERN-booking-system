import ItemBooking from './ItemBooking.jsx'
import { useBookingsContext } from '../hooks/useBookingsContext.jsx'
import { useLocation } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext.jsx'
import { getUserBookings } from '../api/BookingsApi.js'
import { useEffect, useState } from 'react';
import DeleteDialog from '../components/DeleteDialog.jsx';
import ViewDialog from '../components/ViewDialog.jsx';

function ListItems() {
  const [hiddenDel, setHiddenDel] = useState(true)
  const [hiddenView, setHiddenView] = useState(true)
  const [deleteId, setDeleteId] = useState("")
  const [viewId, setViewId] = useState("")
  const {bookings, dispatch} = useBookingsContext()
  const location = useLocation()
  const {loggedInUserId, token} = useAuthContext()

  useEffect(() => {
    getUserBookings(
      token,
      location.search, 
      dispatch
    )
  }, [token, loggedInUserId, location, dispatch])

  const handleDeleteDialog = ({ id_booking, openDialog }) => {
    setHiddenDel(openDialog)
    setDeleteId(id_booking)
  }

  const handleViewDialog = ({ id_booking, openDialog}) => {
    setHiddenView(openDialog)
    setViewId(id_booking)
  }

  return (
    <div className='flex flex-col gap-4 pb-[8rem]'>
      {
        bookings.map((i) => (
          <ItemBooking key={i._id} data={i} onDelete={(d) => handleDeleteDialog(d)} onView={(d) => handleViewDialog(d)} />
        ))
      }

      {
        !hiddenDel &&
        <DeleteDialog onClose={setHiddenDel} id_booking={deleteId} />
      }

      {
        !hiddenView &&
        <ViewDialog onClose={setHiddenView} id_booking={viewId} />
      }
    </div>
  )
}

export default ListItems