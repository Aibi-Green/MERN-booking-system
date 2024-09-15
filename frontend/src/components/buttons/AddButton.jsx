import PropTypes from 'prop-types'
import OperationButton from '../buttons/OperationButton.jsx'
import { Plus } from 'lucide-react'

function AddButton({ className }) {
    return (
        <OperationButton
            className={`rounded-full bg-green-500 active:bg-green-600 
          active:text-white hover:bg-green-400 pl-2 py-2 sm:pl-4 ${className}`}>
            <span className='hidden sm:block'>Create Booking</span>
            <Plus className='size-8' />
        </OperationButton>
    )
}

AddButton.propTypes = {
    className: PropTypes.string
}

export default AddButton