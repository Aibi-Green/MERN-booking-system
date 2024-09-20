import TitleContainer from '../components/TitleContainer.jsx'
import ContentContainer from '../components/ContentContainer.jsx'
import AddBookingForm from '../components/forms/AddBookingForm.jsx'

function AddBooking() {

  return (
    <section className='user-section'>
      <TitleContainer>Create New Booking</TitleContainer>
      
      <ContentContainer>
        <AddBookingForm />
      </ContentContainer>
    </section>
  )
}

export default AddBooking