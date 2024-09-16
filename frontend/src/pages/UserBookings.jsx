import SearchUserBookings from '../components/searchUserBookings';
import TitleContainer from '../components/TitleContainer.jsx';
import ListItems from '../components/ListItems.jsx';
import ContentContainer from '../components/ContentContainer.jsx';
import { getBookings } from '../api/bookingsApi.jsx';
import { useEffect, useState } from 'react';

function UserBookings() {
  // TODO handle dates better cause it keeps adding one day
  // const [ searchPayload, setSearchPayload ] = useState({})
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    getBookings(setBookings)
  }, [])

  const handleSearchPayload = (data) => {
    console.log(data);
  }

  return (
    <section>

      <TitleContainer>Bookings</TitleContainer>

      <ContentContainer>
        <SearchUserBookings onData={handleSearchPayload} className="mb-5" />
        <ListItems data={bookings} />
      </ContentContainer>

    </section>
  )
}

export default UserBookings