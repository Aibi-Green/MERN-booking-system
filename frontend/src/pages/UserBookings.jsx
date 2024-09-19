import SearchUserBookings from '../components/searchUserBookings';
import TitleContainer from '../components/TitleContainer.jsx';
import ListItems from '../components/ListItems.jsx';
import ContentContainer from '../components/ContentContainer.jsx';
import { getUserBookings } from '../api/bookingsApi.jsx';
import { useEffect, useState } from 'react';
import { loggedInUserID } from '../assets/Data.jsx';
import DeleteDialog from '../components/DeleteDialog.jsx';
import ViewDialog from '../components/ViewDialog.jsx';
import { useBookingsContext } from '../hooks/useBookingsContext.jsx';

function UserBookings() {
  // TODO handle dates better cause it keeps adding one day
  // const [ searchPayload, setSearchPayload ] = useState({})
  const [hiddenDel, setHiddenDel] = useState(true)
  const [hiddenView, setHiddenView] = useState(true)
  const [deleteId, setDeleteId] = useState("")
  const [viewId, setViewId] = useState("")
  const {bookings, dispatch} = useBookingsContext()

  useEffect(() => {

    // console.log("Getting user bookings...");
    getUserBookings(loggedInUserID, dispatch)
    // console.log("Finished laying out user bookings.")    

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDeleteDialog = ({ id_booking, openDialog }) => {
    setHiddenDel(openDialog)
    setDeleteId(id_booking)
  }

  const handleViewDialog = ({ id_booking, openDialog}) => {
    setHiddenView(openDialog)
    setViewId(id_booking)
  }

  const handleSearchPayload = (data) => {
    console.log(data); // TODO
  }

  return (
    <section>

      <TitleContainer>Bookings</TitleContainer>

      <ContentContainer>
        <SearchUserBookings onData={handleSearchPayload} className="mb-5" />

        {/* TODO do a overflow auto for scrolling */}
        <ListItems data={bookings} onDelete={(d) => handleDeleteDialog(d)} onView={(d) => handleViewDialog(d)} />
      </ContentContainer>

      {
        !hiddenDel &&
        <DeleteDialog onClose={setHiddenDel} id={deleteId} />
      }

      {
        !hiddenView &&
        <ViewDialog onClose={setHiddenView} id={viewId} />
      }

    </section>
  )
}

export default UserBookings