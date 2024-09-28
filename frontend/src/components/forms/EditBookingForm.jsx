import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"

import Label from "../ui/Label.jsx"
import { editBooking, viewBooking } from "../../api/BookingsApi.jsx"
import SubmitButton from "../buttons/SubmitButton"
import CancelButton from "../buttons/CancelButton"
import { formatDate, formatTime, purposes } from "../../assets/Data"
import Dropdown from "../ui/Dropdown"
import LoaderIcon from "../ui/LoaderIcon"
import NumberInput from '../ui/NumberInput.jsx'
import DateRange from "../ui/DateRange"
import MultiSelect from "../MultiSelect.jsx"
import { handleBookingFormValidations } from "../validations/FormValidations.jsx"
import { useAuthContext } from "../../hooks/useAuthContext.jsx"
import StatusTags from "../ui/StatusTags.jsx"
import InlineError from "../InlineError.jsx"

function EditBookingForm() {
  const defaultForm = {
    purpose: '',
    date_start: '',
    date_end: '',
    num_participants: '',
    requirements: ''
  }

  const params = useParams()
  const id_booking = params.id_booking
  const { token } = useAuthContext()
  const [data, setData] = useState()
  const [form, setForm] = useState(defaultForm)

  const guestsRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [validations, setValidations] = useState(null)

  useEffect(() => {
    viewBooking(token, params.id_booking, setData, setIsLoading)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isLoading == false) {
      const num = (data && data.num_participants) ? data.num_participants : null
      guestsRef.current.value = num
    }
  }, [data, isLoading])

  useEffect(() => {
    if (validations && Object.keys(validations).length == 0) {
      let payload = { ...form }

      Object.keys(payload).map(i => {
        if (payload[i] === data[i] || payload[i] === '') {
          delete payload[i]
        }
      })

      let removePlaces = []
      let addPlaces = []

      // adds place id in addPlaces if not found in data requirements
      for (const place of payload.requirements) {
        if (!data.requirements.includes(place)) {
          addPlaces.push(place)
        }
      }

      // adds place id in removePlaces if not found in payload requirements
      for (const place of data.requirements) {
        if (!payload.requirements.includes(place)) {
          removePlaces.push(place)
        }
      }

      payload = {
        ...payload,
        requirements: {
          add_places: addPlaces,
          remove_places: removePlaces
        }
      }

      console.log("Adding Booking...")
      editBooking(token, id_booking, payload, setIsLoading)
      setValidations(null)
    }
  }, [validations, data, form, token, id_booking])

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handlePayloadForValidations = () => {
    let payload = { ...form }

    Object.keys(payload).map(i => {
      if (!payload[i] || payload[i] == '') {
        payload[i] = data[i]
      }
    })

    return payload
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = handlePayloadForValidations()
    handleBookingFormValidations(setValidations, payload)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col grow">

      <div className="flex justify-center m-2">
        <div
          className="bg-slate-500 text-white px-3 rounded-full"
          onClick={() => console.log("data\n", data)}>
          SHOW data
        </div>
        <div
          className="bg-slate-500 text-white px-3 rounded-full"
          onClick={() => console.log("form\n", form)}>
          SHOW form
        </div>
      </div>

      {
        (!data)
        ?
          <LoaderIcon className="grow" iconClassName="size-14" />
        :
          <div className="flex flex-col gap-6  grow">
            <div>
              {/* {StatusTags(data.status)} */}
              <Label text="Date Requested:">
                <div className="flex gap-4">
                  <div>
                    {formatDate(data.date_requested)} {formatTime(data.date_requested)}
                  </div>
                  <div>
                    {StatusTags(data.status)}
                  </div>
                </div>
              </Label>
            </div>

            <Label htmlFor="purpose" text={`Purpose: ${(form.purpose) ? form.purpose : data.purpose}`}>
              <Dropdown id="purpose" name="purpose" inputInitialValue={(form.purpose) ? form.purpose : data.purpose} data={purposes} onData={handleForm} className="border" />
              <InlineError validations={validations} property="purpose" />
            </Label>

            <div>
              <div className="font-semibold mb-1">Pick Start and End Date</div>
              <DateRange startData={handleForm} endData={handleForm} initialStartDate={data.date_start} initialEndDate={data.date_end} pattern={`[0-9]`} noIcon={true} />
              <InlineError validations={validations} property="date" />
            </div>

            <Label htmlFor="guests" text="Expected Number of Guests">
              <NumberInput id="guests" name="guests" ref={guestsRef} onChange={() => handleForm({ target: { name: "num_participants", value: guestsRef.current.value } })} placeholder="Enter a number from 1-5000"
                className="border" />
              <InlineError validations={validations} property="num_participants" />
            </Label>

            <div className='flex flex-col grow'>
              <div className="font-semibold mb-1">Venue Requirements</div>
              <MultiSelect initialValue={data.requirements} onData={handleForm} />
              <InlineError validations={validations} property="requirements" />
            </div>

            <div className='flex flex-col gap-2 w-[50%] min-w-[200px] self-center'>
              <SubmitButton type="submit">Submit</SubmitButton>
              <CancelButton to='/userbookings' className="w-full" />
            </div>
          </div>
      }
    </form>
  )
}

export default EditBookingForm