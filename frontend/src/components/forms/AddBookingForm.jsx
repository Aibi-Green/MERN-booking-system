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
  const { token } = useAuthContext()
  const guestsRef = useRef(null)
  const [validations, setValidations] = useState(null)
  const [form, setForm] = useState({
    purpose: '',
    date_start: '',
    date_end: '',
    num_participants: '',
    requirements: ''
  })

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token, navigate])

  useEffect(() => {
    if (validations && Object.keys(validations).length == 0) {
      addBooking(token, form)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validations])

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    handleBookingFormValidations(setValidations, form)

    console.log(form)
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col'>

      <div className='flex flex-col gap-6  grow'>
        <Label htmlFor="purpose" text={`Purpose: ${form.purpose}`}>
          <Dropdown id="purpose" name="purpose" type="text" data={purposes} onData={handleForm} className="border" />
          <span className="text-red-400 text-sm">
            {(validations && validations.purpose) ? validations.purpose : ""}
          </span>
        </Label>

        <div>
          <div className="font-semibold mb-1">Pick Start and End Date</div>
          <DateRange startData={handleForm} endData={handleForm} pattern={`[0-9]`} noIcon={true} />
          <span className="text-red-400 text-sm">
            {(validations && validations.date) ? validations.date : ""}
          </span>
        </div>

        <Label htmlFor="guests" text="Expected Number of Guests">
          <NumberInput id="guests" name="guests" ref={guestsRef} onChange={() => handleForm({ target: { name: "num_participants", value: guestsRef.current.value } })} placeholder="Enter a number from 1-5000"
            className="border" />
          <span className="text-red-400 text-sm">
            {(validations && validations.num_participants) ? validations.num_participants : ""}
          </span>
        </Label>

        <div className='flex flex-col grow'>
          <div className="font-semibold mb-1">Venue Requirements</div>
          <MultiSelect onData={handleForm} />
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