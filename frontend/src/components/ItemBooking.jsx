import { EyeIcon, LucideEdit, LucideTrash } from 'lucide-react';
import PropTypes from 'prop-types'
import { formatDate, formatTime } from '../assets/Data';
import formatStatus from './ui/StatusTags.jsx'
import { Link } from 'react-router-dom';

function ItemBookings({data, onDelete}) {

  const handleDelete = (id, bool) => {
    // console.log("id: ", id, "\nbool: ", bool);
    onDelete({
      id_booking: id,
      openDialog: bool
    })
  }

  return (
    <div className='flex flex-row overflow-hidden rounded-2xl shadow-md border'>
      <div className='bg-white flex flex-col grow gap-1 p-5'>

        <span>{formatStatus(data.status)}</span>

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
      </div>
      <div className='bg-slate-100 flex flex-col items-center'>
        <Link to={`/viewbooking/${data._id}`} className='grow flex items-center px-4 hover:bg-slate-300 active:bg-slate-400'>
          <EyeIcon className='size-8 opacity-80' />
        </Link>
        <Link to={`/editbooking/${data._id}`} className='grow flex items-center px-4 hover:bg-slate-300 active:bg-slate-400'>
          <LucideEdit className='size-8 opacity-80' />
        </Link>
        {/* to={`/viewbooking/${data._id}`} */}
        <button onClick={() => handleDelete(data._id, false)} className='grow flex items-center px-4 hover:bg-red-300 active:bg-red-400 hover:text-white active:text-white'>
          <LucideTrash className='size-8 opacity-80' />
        </button>
      </div>
    </div>
  )
}

ItemBookings.propTypes = {
  data: PropTypes.object,
  onDelete: PropTypes.func
}

export default ItemBookings