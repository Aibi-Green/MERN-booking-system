import Label from './ui/Label.jsx'
import Dropdown from './ui/Dropdown.jsx'
import { useRef, useState } from 'react'
import DateRange from './ui/DateRange.jsx'
import NumberInput from './ui/NumberInput.jsx'
import { purposes } from '../assets/Data.jsx'
import MultiSelect from './MultiSelect.jsx'
import SubmitButton from './buttons/SubmitButton.jsx'
import CancelButton from './buttons/CancelButton.jsx'

function AddBooking() {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [purpose, setPurpose] = useState()
  const [guests, setGuests] = useState(0)
  const guestsRef = useRef(null)
  const [requirements, setRequirements] = useState([])


  const handleGuests = () => {
    setGuests(guestsRef.current.value)
  }

  const handleSubmit = () => {
    if (guests > 100) {
      console.log("Guests is greater than 100! Lower it.");
      // guestsRef.current.
    }

    console.log("Booking\n", {
      date_start: startDate,
      date_end: endDate,
      purpose: purpose,
      guests: guests,
    }, "\n\nBooking Requirements\n\n", {
      requirements: requirements
    });
  }

  return (
    <div className='bg-[#00000071] min-h-[100vh] flex items-center absolute w-[100vw]'>
      <div className='container bg-white mx-auto w-[95%] rounded-lg px-12 py-14 flex flex-col gap-4'>

        <div className='mb-3'>
          <h2 className='text-xl font-bold'>Add New Booking</h2>
          <hr className='mt-3' />
        </div>

        <div className='flex flex-col gap-6'>
          <Label text="Purpose">
            <Dropdown data={purposes} onData={setPurpose} className={"border"} />
          </Label>

          <div>
            <Label text="Pick Start and End Date" />
            <DateRange startData={setStartDate} endData={setEndDate} pattern={`[0-9]`} noIcon={true} />
          </div>

          <Label text="Guests">
            <NumberInput ref={guestsRef} onChange={handleGuests} placeholder="Number of Guests" type="number" />
          </Label>

          <div>
            <Label text="Venue Requirements" className="flex flex-col" />
            <MultiSelect onData={setRequirements} />
          </div>

          <div className='flex flex-col gap-2 w-[50%] min-w-[200px] self-center mt-10'>
            <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
            <CancelButton>Cancel</CancelButton>
          </div>

        </div>

      </div>
    </div>
  )
}

export default AddBooking