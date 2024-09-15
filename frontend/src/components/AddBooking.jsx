import Label from './ui/Label.jsx'
import Dropdown from './ui/Dropdown.jsx'
import { useRef, useState } from 'react'
import DateRange from './ui/DateRange.jsx'
import NumberInput from './ui/NumberInput.jsx'
import { purposes } from '../assets/Data.jsx'
import MultiSelect from './MultiSelect.jsx'
import SubmitButton from './buttons/SubmitButton.jsx'
import CancelButton from './buttons/CancelButton.jsx'
import FormErrors from './ui/FormErrors.jsx'

function AddBooking() {

  // const [startDate, setStartDate] = useState(minStartDateTime)
  // const [endDate, setEndDate] = useState(endDateTime)

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const [purposeID, setPurposeID] = useState("")
  const [guests, setGuests] = useState(0)
  const guestsRef = useRef(null)
  const [requirementsID, setRequirementsID] = useState([])

  const [validations, setValidations] = useState([])

  const handleGuests = () => {
    setGuests(guestsRef.current.value)
  }

  const handleValidations = () => {
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

    if(requirementsID.length == 0) {
      errors.push("Please pick at least one place under venue requirements.")
    }

    setValidations(errors)
  }

  const handleSubmit = () => {
    handleValidations()

    console.log("Booking\n", {
      purpose: purposeID,
      date_start: startDate,
      date_end: endDate,
      guests: guests,
    }, "\n\nBooking Requirements\n\n", {
      requirements: requirementsID
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

          <div className='flex flex-col gap-2 w-[50%] min-w-[200px] self-center mt-10'>
            <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
            <CancelButton onClick={() => console.log(validations)}>Cancel</CancelButton>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AddBooking