import ContentContainer from "../components/ContentContainer"
import TitleContainer from "../components/TitleContainer"
import { useParams } from "react-router-dom"
// import { bookings } from "../assets/Data.jsx"
import Label from "../components/ui/Label.jsx"
import { useEffect, useState } from "react"
import { viewBooking } from '../api/BookingsApi.jsx'

function ViewBooking() {
  const { id_booking } = useParams()
  // console.log(id_booking);
  const [booking, setBooking] = useState({})
  
  useEffect(() => {
    viewBooking(id_booking, setBooking)
  }, [id_booking])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(booking)
  }

  return (
    <section>

      <TitleContainer>View Booking</TitleContainer>

      <ContentContainer>
        <form onSubmit={handleSubmit}>
          <button type="submit">Submit</button>
          {/* <Label text={`Purpose: ${(purposeID) ?
            (purposes.find((i) => i._id == purposeID)).name :
            ""
            }`}>
            <Dropdown data={purposes} onData={setPurposeID} className="border" />
          </Label>

          <div>
            <Label text="Pick Start and End Date" />
            <DateRange startData={setStartDate} endData={setEndDate} pattern={`[0-9]`} noIcon={true} />
          </div>

          <Label text="Expected Number of Guests">
            <NumberInput ref={guestsRef} onChange={handleGuests} placeholder="Enter a number from 1-5000" type="number"
              className="border" />
          </Label>

          <div>
            <Label text="Venue Requirements" className="flex flex-col" />
            <MultiSelect onData={setRequirementsID} />
          </div>

          <FormErrors errorArr={validations} />

          <div className='flex flex-col gap-2 w-[50%] min-w-[200px] self-center'>
            <SubmitButton type="submit">Submit</SubmitButton>
            <Link to='/userbookings'>
              <CancelButton className="w-full" type="button">Cancel</CancelButton>
            </Link>
          </div> */}
        </form>
      </ContentContainer>

    </section>
  )
}

export default ViewBooking