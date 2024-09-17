import { useEffect, useRef, useState } from "react"
import ContentContainer from "../components/ContentContainer"
import TitleContainer from "../components/TitleContainer"
import Label from "../components/ui/Label"
import { Link, useParams } from "react-router-dom"
import { viewBooking } from "../api/bookingsApi"
import SubmitButton from "../components/buttons/SubmitButton"
import CancelButton from "../components/buttons/CancelButton"
import { purposes } from "../assets/Data"
import Dropdown from "../components/ui/Dropdown"
import LoaderIcon from "../components/ui/LoaderIcon"
import NumberInput from '../components/ui/NumberInput.jsx'
import DateRange from "../components/ui/DateRange"
import MultiSelect from "../components/MultiSelect.jsx"

function EditBooking() {
  const guestsRef = useRef(null)
  const { id_booking } = useParams()
  const [data, setData] = useState()
  const [purpose, setPurpose] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [guests, setGuests] = useState(0)
  const [requirementsID, setRequirementsID] = useState([])
  const [payload, setPayload] = useState()

  useEffect(() => {
    viewBooking(id_booking, setData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(data != undefined) {
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
    if(payload != undefined) {
      console.log(payload);
    }
  }, [payload])

  const handleSubmit = (e) => {
    e.preventDefault()
    setPayload({
      purpose: purpose,
      date_start: startDate,
      date_end: endDate,
      num_participants: guests,
      requirements: requirementsID
    })
  }

  return (
    <section>
      <TitleContainer>Change Booking Details</TitleContainer>
      {/* <div className="flex justify-center m-2"><button
        className="bg-slate-500 text-white px-3 rounded-full"
        onClick={() => console.log("PAYLOAD\n", payload)}>
        SHOW PAYLOAD
      </button></div> */}
      <ContentContainer>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 grow">

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

export default EditBooking