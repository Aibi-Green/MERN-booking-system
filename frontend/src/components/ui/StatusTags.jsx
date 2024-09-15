import { CheckCircle, CircleDashed, XCircle } from 'lucide-react';

const StatusTags = (status) => {
  if (status == 0) {
    return (
      <div className='flex items-center text-yellow-500 font-bold select-none'>
        <CircleDashed className='mr-2 size-4' />
        <span className='text-sm'>Pending</span>
      </div>
    )
  } else if (status == 1) {
    return (
      <div className='flex items-center text-green-500 font-bold select-none'>
        <CheckCircle className='mr-2 size-4' />
        <span className='text-sm'>Approved</span>
      </div>
    )
  } else if (status == 2) {
    return (
      <div className='flex items-center text-red-500 font-bold select-none'>
        <XCircle className='mr-2 size-4' />
        <span className='text-sm'>Rejected</span>
      </div>
    )
  }
}

export default StatusTags