import Label from '../components/ui/Label.jsx'
import Dropdown from '../components/ui/Dropdown.jsx'
import { useRef, useState } from 'react'
import DateRange from '../components/ui/DateRange.jsx'
import NumberInput from '../components/ui/NumberInput.jsx'
import { purposes } from '../assets/Data.jsx'
import MultiSelect from '../components/MultiSelect.jsx'
import SubmitButton from '../components/buttons/SubmitButton.jsx'
import CancelButton from '../components/buttons/CancelButton.jsx'
import FormErrors from '../components/ui/FormErrors.jsx'
import TitleContainer from '../components/TitleContainer.jsx'
import ContentContainer from '../components/ContentContainer.jsx'
import { Link } from 'react-router-dom'

function AddBooking() {

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const [purposeID, setPurposeID] = useState("")
  const [guests, setGuests] = useState(0)
  const guestsRef = useRef(null)
  const [requirementsID, setRequirementsID] = useState([])

  const [validations, setValidations] = useState([""])
  // const [bookingPayload, setBookingPayload] = useState({})
  // const [bookingVenuesPayload, setBookingVenuesPayload] = useState({})

  const handleGuests = () => {
    setGuests(guestsRef.current.value)
  }

  const handleValidations = () => {
    console.log("Checking validations for add bookings...");

    let errors = []

    if (purposeID.length === 0 || !purposes.some(i => i._id === purposeID)) {
      errors.push("Please select a valid purpose.")
    }

    if (startDate == null || endDate == null) {
      errors.push("Please select valid start and end dates.")
    } else if (startDate > endDate) {
      errors.push("Start date should be set before end date.")
    } else if ((endDate.getDate() - startDate.getDate()) == 0 &&
      (endDate.getTime() - startDate.getTime()) < 3600000) {
      errors.push("Start and end date must be 1 hour or 1 day apart.")
    }

    if (guests > 5000) {
      errors.push("Please enter a number below the maximum number of guests.")
    } else if (guests == 0) {
      errors.push("Please enter a number greater than 0 for guests.")
    }

    if (requirementsID.length == 0) {
      errors.push("Please pick at least one place under venue requirements.")
    }
    console.log("Setting validations...");
    setValidations(errors)
    console.log("Done with validations...");
  }

  // useEffect(() => {
  //   if (validations.length == 0) {
  //     setBookingPayload({
  //       purpose: purposeID,
  //       date_start: startDate,
  //       date_end: endDate,
  //       guests: guests,
  //     })
  //     setBookingVenuesPayload({
  //       requirements: requirementsID
  //     })
  //   }
  // }, [endDate, guests, purposeID, requirementsID, startDate, validations])

  // const handleCancel = () => {
  //   console.log(bookingPayload);
  //   console.log(bookingVenuesPayload);
  // }

  const handleSubmit = (e) => {
    e.preventDefault()

    handleValidations()
  }

  return (
    <section>
      <TitleContainer>Create New Booking</TitleContainer>

      <ContentContainer>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
          <Label text={`Purpose: ${(purposeID) ?
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
          </div>
        </form>
      </ContentContainer>
    </section>
  )
}

export default AddBooking