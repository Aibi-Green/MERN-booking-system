import SearchUserBookingsForm from '../../components/forms/SearchUserBookingsForm.jsx';
import TitleContainer from '../../components/TitleContainer.jsx';
import ListBooking from '../../components/ListBooking.jsx';
import ContentContainer from '../../components/ContentContainer.jsx';

function UserBookings() {
  return (
    <section className='user-section'>

      <TitleContainer>Bookings</TitleContainer>

      <ContentContainer>
        <SearchUserBookingsForm className="mb-5" />

        {/* TODO do a overflow auto for scrolling */}
        <ListBooking />
      </ContentContainer>

    </section>
  )
}

export default UserBookings