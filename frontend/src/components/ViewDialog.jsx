import { useEffect, useState } from "react";
import CancelButton from "./buttons/CancelButton";
import { formatDate, formatTime } from '../assets/Data';
import PropTypes from 'prop-types'
import formatStatus from './ui/StatusTags.jsx'
import { viewBooking } from "../api/bookingsApi";
import LoaderIcon from "./ui/LoaderIcon.jsx";
import BigDialog from "./ui/BigDialog.jsx";

function ViewDialog({ onClose, id }) {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    viewBooking(id, setData, setIsLoading)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <BigDialog className="min-h-[500px] gap-5">
      <div className="w-full text-center">
        <h4 className="text-xl font-bold">Booking Details</h4>
        <p className="text-sm opacity-40">ID: {id}</p>
        {/* <div className="border px-2 bg-slate-300" onClick={() => console.log(data)}>
          Click to show view data
        </div> */}
      </div>

      {
        (isLoading) ?

          <LoaderIcon className="grow" /> 
          
          :

          <div className="flex flex-col w-full grow">
            <div>{formatStatus(data.status)}</div>

            <span className='text-sm opacity-80'>Date Requested: {formatDate(data.date_requested)}</span>

            <span className='mt-2 text-lg font-bold capitalize'>{data.purpose}</span>

            <div>
              <span className='mr-3 opacity-90'>From:</span>
              <span>{formatDate(data.date_start)} {formatTime(data.date_start)}</span>
            </div>

            <div>
              <span className='mr-8 opacity-90'>To:</span>
              <span>{formatDate(data.date_end)} {formatTime(data.date_end)}</span>
            </div>

            <div>
              <span className='opacity-90 mr-4'>Expected Guests:</span><span>{data.num_participants}</span>
            </div>

            <div className="mt-3 flex flex-col grow">
              <span className="opacity-90">Venue Requirements:</span>
              {
                (data.requirements && data.requirements.length > 0) ?
                <div className="">
                  {
                    // First get types
                    data.types.map((type) => (
                      // Only show types that exist in requirements
                      (data.requirements.some(req => req.type === type.name)) &&
                      <div key={type._id} className="">
                        <div className="font-semibold border-b-2">{type.name}</div>
                        <div className="flex flex-wrap gap-1 justify-center items-center p-2">
                        {
                          // Get only requirements under current type
                          data.requirements.filter((req) => {
                            return type._id === req.id_type
                          })
                          // Then return the filtered result
                          .map((req) => {
                            return <span key={req.id_requirement} className="bg-slate-300 rounded-full px-3 py-1">{req.name}</span>
                          })
                        }
                        </div>
                      </div>
                      
                    ))
                  }
                </div> :
                <div className="w-full grow flex justify-center items-center">
                  <div className="opacity-40 italic ">No Requirements included</div>
                </div>
              }
            </div>
          </div>
      }

      <div className="flex flex-col w-full sm:min-w-[300px]">
        <CancelButton onClick={() => onClose(true)} >Close</CancelButton>
      </div>
    </BigDialog>
  )
}

ViewDialog.propTypes = {
  onClose: PropTypes.func,
  id: PropTypes.string
}

export default ViewDialog