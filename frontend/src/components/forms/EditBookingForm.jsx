import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"

import Label from "../ui/Label.jsx"
import { editBooking, viewBooking } from "../../api/BookingsApi.js"
import SubmitButton from "../buttons/SubmitButton"
import CancelButton from "../buttons/CancelButton"
import { purposes } from "../../assets/Data"
import Dropdown from "../ui/Dropdown"
import LoaderIcon from "../ui/LoaderIcon"
import NumberInput from '../ui/NumberInput.jsx'
import DateRange from "../ui/DateRange"
import MultiSelect from "../MultiSelect.jsx"
import FormErrors from '../ui/FormErrors.jsx'
import { handleBookingFormValidations } from "../validations/FormValidations.js"
import { useAuthContext } from "../../hooks/useAuthContext.jsx"
import { useBookingsContext } from "../../hooks/useBookingsContext.jsx"

function EditBookingForm() {
  const params = useParams()
  const {token} = useAuthContext()
  const { bookings } = useBookingsContext()
  const [ data, setData] = useState()

  const guestsRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  const [purpose, setPurpose] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [guests, setGuests] = useState(0)
  const [requirementsID, setRequirementsID] = useState([])
  const [validations, setValidations] = useState([""])

  useEffect(() => {
    viewBooking(token, params.id_booking, setData, setIsLoading)
    // console.log(id_booking)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {
  //   if (data != undefined) {
  //     setPurpose(data.purpose)
  //     setStartDate(data.date_start)
  //     setEndDate(data.date_end)
  //     setGuests(data.num_participants)
  //     guestsRef.current.value = data.num_participants
  //     setRequirementsID(() => {
  //       return data.requirements.map((req) => req.id_requirement)
  //     })
  //   }

  // }, [data])

  // const handleGuests = () => {
  //   setGuests(guestsRef.current.value)
  // }

  // useEffect(() => {
  //   if (validations.length == 0) {
  //     setPayload({
  //       purpose: purpose,
  //       date_start: startDate,
  //       date_end: endDate,
  //       num_participants: guests,
  //       requirements: requirementsID
  //     })
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [validations])

  // useEffect(() => {
  //   // console.log("payload != undefined: ", payload != undefined);
  //   if (payload != undefined) {
  //     console.log("Sending request...");
  //     editBooking(id_booking, payload)
  //   }
  //   setPayload(undefined)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [payload])

  const handleSubmit = (e) => {
    e.preventDefault()
    // handleBookingFormValidations(setValidations, purpose, startDate, endDate, guests, requirementsID)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col grow">

      <div className="flex justify-center m-2"><div
        className="bg-slate-500 text-white px-3 rounded-full"
        onClick={() => console.log("data\n", data)}>
        SHOW data
      </div></div>

      {
        (!data) ?
          <LoaderIcon className="grow" iconClassName="size-14" /> :
          <div className="flex flex-col gap-6  grow">
            <Label htmlFor="purpose" text={`Purpose: ${(purpose != null) ? purpose : data.purpose}`}>
              <Dropdown id="purpose" name="purpose" inputInitialValue={(purpose != null) ? purpose : data.purpose} data={purposes} onData={setPurpose} className="border" />
            </Label>

            <div>
              <div className="font-semibold mb-1">Pick Start and End Date</div>
              <DateRange startData={setStartDate} endData={setEndDate} initialStartDate={data.date_start} initialEndDate={data.date_end} pattern={`[0-9]`} noIcon={true} />
            </div>

            <Label htmlFor="guests" text="Expected Number of Guests">
              <NumberInput id="guests" name="guests" ref={guestsRef} /*onChange={handleGuests}*/ placeholder="Enter a number from 1-5000"
                className="border" />
            </Label>

            <div className='flex flex-col grow'>
              <div className="font-semibold mb-1">Venue Requirements</div>
              <MultiSelect initialValue={data.requirements} onData={setRequirementsID} />
            </div>

            {/* <div onClick={() => console.log(requirementsID)}>Show requirementsID from page</div> */}
          </div>
      }

      <FormErrors errorArr={validations} />

      <div className='flex flex-col gap-2 w-[50%] min-w-[200px] self-center'>
        <SubmitButton type="submit">Submit</SubmitButton>
        <CancelButton to='/userbookings' className="w-full" />
      </div>
    </form>
  )
}

export default EditBookingForm