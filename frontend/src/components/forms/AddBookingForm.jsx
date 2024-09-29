import Label from '../ui/Label.jsx'
import Dropdown from '../ui/Dropdown.jsx'
import { useEffect, useRef, useState } from 'react'
import DateRange from '../ui/DateRange.jsx'
import NumberInput from '../ui/NumberInput.jsx'
import { purposes } from '../../assets/Data.jsx'
import MultiSelect from '../MultiSelect.jsx'
import SubmitButton from '../buttons/SubmitButton.jsx'
import CancelButton from '../buttons/CancelButton.jsx'
import { addBooking } from '../../api/BookingsApi.jsx'
import { handleBookingFormValidations } from '../validations/FormValidations.jsx'
import { useAuthContext } from '../../hooks/useAuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import Dialog from '../ui/Dialog.jsx'
import LoaderIcon from '../ui/LoaderIcon.jsx'
import InlineError from '../InlineError.jsx'

// TODO: prevent form from firing up the handleSubmit function whenever the page refreshes
// or find some other way to clear the form
function AddBookingForm() {
  const defaultForm = {
    purpose: '',
    date_start: '',
    date_end: '',
    num_participants: '',
    requirements: []
  }
  
  const navigate = useNavigate()
  const { token } = useAuthContext()
  const guestsRef = useRef(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [validations, setValidations] = useState(null)
  const [form, setForm] = useState(defaultForm)

  useEffect(() => {
    if (validations != null && Object.keys(validations).length == 0) {
      setOpenDialog(true)
      addBooking(token, form, setIsLoading)
    }
  }, [form, token, validations])

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    handleBookingFormValidations(setValidations, form)
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col'>

      <div className='flex flex-col gap-6  grow'>
        <Label htmlFor="purpose" text={`Purpose: ${form.purpose}`}>
          <Dropdown id="purpose" name="purpose" type="text" data={purposes} onData={handleForm} className="border" />
          <InlineError validations={validations} property="purpose" />
        </Label>

        <div>
          <div className="font-semibold mb-1">Pick Start and End Date</div>
          <DateRange startData={handleForm} endData={handleForm} pattern={`[0-9]`} noIcon={true} />
          <InlineError validations={validations} property="date" />
        </div>

        <Label htmlFor="guests" text="Expected Number of Guests">
          <NumberInput id="guests" name="guests" ref={guestsRef} onChange={() => handleForm({ target: { name: "num_participants", value: guestsRef.current.value } })} placeholder="Enter a number from 1-5000"
            className="border" />
          <InlineError validations={validations} property="num_participants" />
        </Label>

        <div className='flex flex-col grow'>
          <div className="font-semibold mb-1">Venue Requirements</div>
          <MultiSelect initialValue={form.requirements} onData={handleForm} />
          <InlineError validations={validations} property="requirements" />
        </div>

        <div className='flex flex-col gap-2 w-[50%] min-w-[200px] self-center'>
          <SubmitButton type="submit">Submit</SubmitButton>
          <CancelButton to='/userbookings' className="w-full" />
        </div>
      </div>

      {
        (openDialog) &&
        <Dialog>
          {
            (!isLoading) ?
              <div className='flex flex-col gap-2'>
                <span>New Booking has been successfully created!</span>
                <div className='flex gap-2'>
                  <button 
                  onClick={() => {
                    setForm(defaultForm)
                    setValidations(null)
                    navigate(0)
                  }} type='button'
                  className='bg-green-500 text-white text-center rounded-lg py-2 basis-[50%]'>
                    Create Another
                  </button>
                  <CancelButton text="Back to Home" isLink={true} to="/userbookings" className="basis-[50%]" />
                </div>
              </div>
              :
              <div className='italic flex flex-col gap-5'>
                Processing...
                <LoaderIcon iconClassName="size-8" />
              </div>
          }
        </Dialog>
      }

    </form>
  )
}

export default AddBookingForm