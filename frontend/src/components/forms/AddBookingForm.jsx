import Label from '../ui/Label.jsx'
import Dropdown from '../ui/Dropdown.jsx'
import { useEffect, useRef, useState } from 'react'
import DateRange from '../ui/DateRange.jsx'
import NumberInput from '../ui/NumberInput.jsx'
import { purposes } from '../../assets/Data.jsx'
import MultiSelect from '../MultiSelect.jsx'
import SubmitButton from '../buttons/SubmitButton.jsx'
import CancelButton from '../buttons/CancelButton.jsx'
import FormErrors from '../ui/FormErrors.jsx'
import { addBooking } from '../../api/bookingsApi.jsx'
import { handleBookingFormValidations } from '../validations/FormValidations.js'
import { useAuthContext } from '../../hooks/useAuthContext.jsx'
import { jwtDecode } from 'jwt-decode'

function AddBookingForm() {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [purpose, setPurpose] = useState("")
  const [guests, setGuests] = useState(0)
  const guestsRef = useRef(null)
  const [requirementsID, setRequirementsID] = useState([])
  const [validations, setValidations] = useState(null)
  const [payload, setPayload] = useState()
  const { token } = useAuthContext()

  useEffect(() => {

  }, [])

  const handleGuests = () => {
    setGuests(guestsRef.current.value)
  }

  useEffect(() => {
    // 2: SET PAYLOAD AFTER VALIDATIONS
    // if (validations && validations.length == 0) {
    //   setPayload({
    //     purpose: purpose,
    //     date_start: startDate,
    //     date_end: endDate,
    //     num_participants: guests,
    //     requirements: requirementsID
    //   })
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validations])

  useEffect(() => {
    // if (payload != undefined) {
    //   console.log("Sending request...");
    //   // addBooking(jwtDecode(token)._id, payload)
    //   setPayload(undefined)
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload])

  const handleSubmit = (e) => {
    e.preventDefault()

    const fieldValues = {
      purpose: purpose,
      date_start: new Date(startDate).toISOString(),
      date_end: new Date(endDate).toISOString(),
      num_participants: guests,
      requirements: requirementsID
    }

    console.log("fieldValues", fieldValues);

    // 1: SET VALIDATIONS
    handleBookingFormValidations(setValidations, fieldValues)
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col'>
      {/* <button onClick={() => console.log("PAYLOAD\n", payload)}>SHOW PAYLOAD</button> */}

      <div className='flex flex-col gap-6  grow'>
        <Label htmlFor="purpose" text={`Purpose: ${(purpose) ? (purposes.find((i) => i == purpose)) : ""}`}>
          <Dropdown id="purpose" name="purpose" type="text" data={purposes} onData={setPurpose} className="border" />
          <span className="text-red-400 text-sm">
            {(validations && validations.purpose) ? validations.purpose : ""}
          </span>
        </Label>

        <div>
          <div className="font-semibold mb-1">Pick Start and End Date</div>
          <DateRange startData={setStartDate} endData={setEndDate} pattern={`[0-9]`} noIcon={true} />
          <span className="text-red-400 text-sm">
            {(validations && validations.date) ? validations.date : ""}
          </span>
        </div>

        <Label htmlFor="guests" text="Expected Number of Guests">
          <NumberInput id="guests" name="guests" ref={guestsRef} onChange={handleGuests} placeholder="Enter a number from 1-5000"
            className="border" />
          <span className="text-red-400 text-sm">
            {(validations && validations.num_participants) ? validations.num_participants : ""}
          </span>
        </Label>

        <div className='flex flex-col grow'>
          <div className="font-semibold mb-1">Venue Requirements</div>
          <MultiSelect onData={setRequirementsID} />
          <span className="text-red-400 text-sm">
            {(validations && validations.requirements) ? validations.requirements : ""}
          </span>
        </div>

        <div className='flex flex-col gap-2 w-[50%] min-w-[200px] self-center'>
          <SubmitButton type="submit">Submit</SubmitButton>
          <CancelButton to='/userbookings' className="w-full" />
        </div>
      </div>
    </form>
  )
}

export default AddBookingForm