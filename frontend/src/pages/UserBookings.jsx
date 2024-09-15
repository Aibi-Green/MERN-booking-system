import SearchUserBookings from '../components/searchUserBookings';
import { bookings } from '../assets/Data.jsx'
import TitleContainer from '../components/TitleContainer.jsx';
import ListItems from '../components/ListItems.jsx';
import ContentContainer from '../components/ContentContainer.jsx';

function UserBookings() {
  // TODO handle dates better cause it keeps adding one day
  // const [ searchPayload, setSearchPayload ] = useState({})

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