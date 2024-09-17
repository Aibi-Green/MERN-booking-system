import { useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"

import Label from "../ui/Label.jsx"
import { editBooking, viewBooking } from "../../api/bookingsApi"
import SubmitButton from "../buttons/SubmitButton"
import CancelButton from "../buttons/CancelButton"
import { purposes } from "../../assets/Data"
import Dropdown from "../ui/Dropdown"
import LoaderIcon from "../ui/LoaderIcon"
import NumberInput from '../ui/NumberInput.jsx'
import DateRange from "../ui/DateRange"
import MultiSelect from "../MultiSelect.jsx"
import FormErrors from '../ui/FormErrors.jsx'
import { handleUserFormValidations } from "../validations/UserFormValidations.jsx"

function EditBookingForm() {
  const guestsRef = useRef(null)
  const { id_booking } = useParams()
  const [data, setData] = useState()
  const [purpose, setPurpose] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [guests, setGuests] = useState(0)
  const [requirementsID, setRequirementsID] = useState([])
  const [validations, setValidations] = useState([""])
  const [payload, setPayload] = useState(undefined)

  useEffect(() => {
    viewBooking(id_booking, setData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (data != undefined) {
      setPurpose(data.purpose)
      setStartDate(data.date_start)
      setEndDate(data.date_end)
      setGuests(data.num_participants)
      guestsRef.current.value = data.num_participants
      setRequirementsID(() => {
        return data.requirements.map((req) => req.id_requirement)
      })
    }
    
  }, [data])

  const handleGuests = () => {
    setGuests(guestsRef.current.value)
  }

  useEffect(() => {
    if(validations.length == 0) {
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
    // console.log("payload != undefined: ", payload != undefined);
    if (payload != undefined) {
      console.log("Sending request...");
      editBooking(id_booking, payload)
    }
    setPayload(undefined)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload])

  const handleSubmit = (e) => {
    e.preventDefault()
    handleUserFormValidations(setValidations, purpose, startDate, endDate, guests, requirementsID)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col grow">
      
      <div className="flex justify-center m-2"><div
        className="bg-slate-500 text-white px-3 rounded-full"
        onClick={() => console.log("PAYLOAD\n", payload)}>
        SHOW PAYLOAD
      </div></div>

      {
        (data === undefined) ?
          <LoaderIcon className="grow" /> :
          <div className="flex flex-col gap-6  grow">
            <Label text={`Purpose: ${(purpose != null) ? purpose : data.purpose}`}>
              <Dropdown inputInitialValue={(purpose != null) ? purpose : data.purpose} data={purposes} onData={setPurpose} className="border" />
            </Label>

            <div>
              <Label text="Pick Start and End Date" />
              <DateRange startData={setStartDate} endData={setEndDate} initialStartDate={data.date_start} initialEndDate={data.date_end} pattern={`[0-9]`} noIcon={true} />
            </div>

            <Label text="Expected Number of Guests">
              <NumberInput ref={guestsRef} onChange={handleGuests} placeholder="Enter a number from 1-5000" type="number"
                className="border" />
            </Label>

            <div className='flex flex-col grow'>
              <Label text="Venue Requirements" className="flex flex-col" />
              <MultiSelect initialValue={requirementsID} onData={setRequirementsID} />
            </div>

            {/* <div onClick={() => console.log(requirementsID)}>Show requirementsID from page</div> */}
          </div>
      }

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

export default EditBookingForm