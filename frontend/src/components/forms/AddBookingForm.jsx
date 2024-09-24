import Label from '../ui/Label.jsx'
import Dropdown from '../ui/Dropdown.jsx'
import { useEffect, useRef, useState } from 'react'
import DateRange from '../ui/DateRange.jsx'
import NumberInput from '../ui/NumberInput.jsx'
import { purposes } from '../../assets/Data.jsx'
import MultiSelect from '../MultiSelect.jsx'
import SubmitButton from '../buttons/SubmitButton.jsx'
import CancelButton from '../buttons/CancelButton.jsx'
import { addBooking } from '../../api/bookingsApi.jsx'
import { handleBookingFormValidations } from '../validations/FormValidations.js'
import { useAuthContext } from '../../hooks/useAuthContext.jsx'
import { useNavigate } from 'react-router-dom'

/**
 * ✅ functions
 * ❌ CSS
 * 
 * @returns Add Booking Form Content
 */
function AddBookingForm() {
  const navigate = useNavigate()
  const { token, loggedInUserId } = useAuthContext()
  const [validations, setValidations] = useState(null)
  const [payload, setPayload] = useState(null)

  const [purpose, setPurpose] = useState("")
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const guestsRef = useRef(null)
  const [guests, setGuests] = useState(null)
  const [requirementsID, setRequirementsID] = useState([])

  // -: RETURN TO LOGIN PAGE IF NO TOKEN IS FOUND
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (payload && validations && Object.keys(validations).length == 0) {      
      // 3: SEND ADD BOOKING REQUEST AFTER CHECKING VALIDATIONS
      addBooking(token, payload)
      // 4: SET PAYLOAD TO UNDEFINED TO PREVENT SENDING REQ AFTER SAVE
      setPayload(undefined)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validations])

  useEffect(() => {
    // 2: SET VALIDATIONS
    if (payload) {
      handleBookingFormValidations(setValidations, payload)
    }
  }, [payload])

  const handleSubmit = (e) => {
    e.preventDefault()

    // 1: SET PAYLOAD
    setPayload({
      purpose: purpose,
      date_start: new Date(startDate).toISOString(),
      date_end: new Date(endDate).toISOString(),
      num_participants: guests,
      requirements: requirementsID,
      id_user: loggedInUserId
    })
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col'>

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
          <NumberInput id="guests" name="guests" ref={guestsRef} onChange={() => setGuests(guestsRef.current.value)} placeholder="Enter a number from 1-5000"
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