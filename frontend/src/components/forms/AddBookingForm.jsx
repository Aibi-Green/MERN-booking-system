import Label from '../ui/Label.jsx'
import Dropdown from '../ui/Dropdown.jsx'
import { useEffect, useRef, useState } from 'react'
import DateRange from '../ui/DateRange.jsx'
import NumberInput from '../ui/NumberInput.jsx'
import { loggedInUserID, purposes } from '../../assets/Data.jsx'
import MultiSelect from '../MultiSelect.jsx'
import SubmitButton from '../buttons/SubmitButton.jsx'
import CancelButton from '../buttons/CancelButton.jsx'
import FormErrors from '../ui/FormErrors.jsx'
import { Link } from 'react-router-dom'
import { addBooking } from '../../api/bookingsApi.jsx'
import { handleUserFormValidations } from '../validations/UserFormValidations.jsx'

function AddBookingForm() {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [purpose, setPurpose] = useState("")
  const [guests, setGuests] = useState(0)
  const guestsRef = useRef(null)
  const [requirementsID, setRequirementsID] = useState([])
  const [validations, setValidations] = useState([""])
  const [payload, setPayload] = useState()

  const handleGuests = () => {
    setGuests(guestsRef.current.value)
  }

  useEffect(() => {
    if (validations.length == 0) {
      setPayload({
        purpose: purpose,
        date_start: startDate,
        date_end: endDate,
        num_participants: guests,
        requirements: requirementsID
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validations])

  useEffect(() => {
    if (payload != undefined) {
      console.log("Sending request...");
      addBooking(loggedInUserID, payload)
      setPayload(undefined)
    }
  }, [payload])

  const handleSubmit = (e) => {
    e.preventDefault()
    const formElems = e.target.elements
    console.log(formElems);
    
    handleUserFormValidations(setValidations, purpose, startDate, endDate, guests, requirementsID)
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col grow'>
      {/* <button onClick={() => console.log("PAYLOAD\n", payload)}>SHOW PAYLOAD</button> */}

      <div className='flex flex-col gap-6  grow'>
        <Label htmlFor="purpose" text={`Purpose: ${(purpose) ?
          (purposes.find((i) => i == purpose)) :
          ""
          }`}>
          <Dropdown id="purpose" name="purpose" type="text" data={purposes} onData={setPurpose} className="border" />
        </Label>

        <div>
          <div className="font-semibold mb-1">Pick Start and End Date</div>
          <DateRange startData={setStartDate} endData={setEndDate} pattern={`[0-9]`} noIcon={true} />
        </div>

        <Label htmlFor="guests" text="Expected Number of Guests">
          <NumberInput id="guests" name="guests" ref={guestsRef} onChange={handleGuests} placeholder="Enter a number from 1-5000"
            className="border" />
        </Label>

        <div className='flex flex-col grow'>
          <div className="font-semibold mb-1">Venue Requirements</div>

          <MultiSelect onData={setRequirementsID} />

        </div>
      </div>

      <FormErrors errorArr={validations} />

      <div className='flex flex-col gap-2 w-[50%] min-w-[200px] self-center'>
        <SubmitButton type="submit">Submit</SubmitButton>
        <Link to='/userbookings'>
          <CancelButton className="w-full" type="button">Cancel</CancelButton>
        </Link>
      </div>
    </form>
  )
}

export default AddBookingForm