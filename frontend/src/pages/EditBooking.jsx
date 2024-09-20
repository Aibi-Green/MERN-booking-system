import ContentContainer from "../components/ContentContainer"
import EditBookingForm from "../components/forms/EditBookingForm"
import TitleContainer from "../components/TitleContainer"

function EditBooking() {
  return (
    <section className='user-section'>
      <TitleContainer>Change Booking Details</TitleContainer>

      <ContentContainer>
        <EditBookingForm />
      </ContentContainer>
    </section>
  )
}

export default EditBooking