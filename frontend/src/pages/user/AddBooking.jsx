import ContentContainer from "../../components/ContentContainer"
import TitleContainer from "../../components/TitleContainer"
import AddBookingForm from "../../components/forms/AddBookingForm"

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