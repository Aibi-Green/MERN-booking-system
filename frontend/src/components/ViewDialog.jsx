import CancelButton from "./buttons/CancelButton";
import { formatDate, formatTime } from '../assets/Data';
import PropTypes from 'prop-types'
import formatStatus from './ui/StatusTags.jsx'
import LoaderIcon from "./ui/LoaderIcon.jsx";
import BigDialog from "./ui/BigDialog.jsx";
import { useBookingsContext } from "../hooks/useBookingsContext.jsx";

function ViewDialog({ onClose, id }) {
  const { bookings } = useBookingsContext()
  const data = bookings.find(i => i._id == id)

  return (
    <BigDialog className="min-h-[500px] gap-5">
      <div className="w-full text-center">
        <h4 className="text-xl font-bold">Booking Details</h4>
        <p className="text-sm opacity-40">ID: {id}</p>
        {/* <div className="border px-2 bg-slate-300" onClick={() => console.log(data)}>
          Click to show one requirement type
        </div> */}
        {/* <div className="border px-2 bg-slate-300" onClick={() => console.log(data)}>
          Click to show view data
        </div> */}
        <hr className="h-1 w-full bg-slate-100 mt-3 rounded-full" />
      </div>

      {
        (!data) ?

          <LoaderIcon className="grow" />

          :

          <div className="flex flex-col w-full grow items-center">
            <div>{formatStatus(data.status)}</div>

            <span className='text-sm opacity-80'>Date Requested: {formatDate(data.date_requested)}</span>

            <span className='mt-5 text-lg font-bold capitalize'>{data.purpose}</span>

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

            <div className="mt-5 flex flex-col grow items-center">
              <span className="opacity-90">Venue Requirements:</span>
              {
                (data.requirements) ?
                  <div>
                    {
                      data.requirements.map(({type, reqs}) => (
                        <div key={type._id}>
                          <span className="font-semibold block text-center">{type.name}</span>
                          <div className="flex flex-wrap gap-1 justify-center items-center p-2">
                            {
                              reqs.map(req => (
                                <span key={req._id} className="border border-slate-400 bg-slate-50 rounded-full px-3 py-1 inline-block">
                                  {req.name}
                                </span>
                              ))
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