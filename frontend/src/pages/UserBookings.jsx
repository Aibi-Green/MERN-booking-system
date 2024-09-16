import SearchUserBookings from '../components/searchUserBookings';
import TitleContainer from '../components/TitleContainer.jsx';
import ListItems from '../components/ListItems.jsx';
import ContentContainer from '../components/ContentContainer.jsx';
import { deleteBooking, getUserBookings } from '../api/bookingsApi.jsx';
import { useEffect, useState } from 'react';
import { loggedInUserID } from '../assets/Data.jsx';
import DeleteDialog from '../components/DeleteDialog.jsx';

function UserBookings() {
  // TODO handle dates better cause it keeps adding one day
  // const [ searchPayload, setSearchPayload ] = useState({})
  const [bookings, setBookings] = useState([])
  const [hidden, setHidden] = useState(true)
  const [deleteId, setDeleteId] = useState("")

  useEffect(() => {
    
    // console.log("Getting user bookings...");
    getUserBookings(loggedInUserID, setBookings)
    // console.log("Finished laying out user bookings.")
    
  }, [])

  const handleDialog = ({id_booking, openDialog}) => {
    setHidden(openDialog)
    setDeleteId(id_booking)
  }

  const handleSearchPayload = (data) => {
    console.log(data); // TODO
  }

  return (
    <section>

      <TitleContainer>Bookings</TitleContainer>
      <ContentContainer>
        <SearchUserBookings onData={handleSearchPayload} className="mb-5" />
        <ListItems data={bookings} onDelete={(d) => handleDialog(d)} />
      </ContentContainer>

      {
        !hidden && 
        <DeleteDialog onClose={setHidden} id={deleteId} />
      }

    </section>
  )
}

export default UserBookings