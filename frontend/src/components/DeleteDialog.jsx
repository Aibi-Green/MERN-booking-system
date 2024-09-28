import Dialog from "./ui/Dialog";
import PropTypes from 'prop-types'
import CancelButton from './buttons/CancelButton.jsx'
import SubmitButton from './buttons/SubmitButton.jsx'
import { deleteBooking } from "../api/BookingsApi.jsx";
import { useBookingsContext } from "../hooks/useBookingsContext.jsx";
import { useAuthContext } from "../hooks/useAuthContext.jsx";

function DeleteDialog({ onClose, id_booking }) {
  const {dispatch} = useBookingsContext()
  const {token} = useAuthContext()

  const handleClose = () => {
    onClose(true)
  }
  
  const handleDelete = () => {
    console.log("Sending delete booking request...")
    
    deleteBooking(token, id_booking, dispatch)
    handleClose()
  }

  return (
    <Dialog className="text-center">
      <h4 className="text-xl">Do you want to delete this booking? {id_booking}</h4>
      <div className="flex flex-row w-full sm:min-w-[300px] mt-8 gap-3">
        <SubmitButton onClick={() => handleDelete()} className="basis-[50%]">Yes</SubmitButton>
        <CancelButton onClick={() => handleClose()} className="basis-[50%]" isLink={false} />
      </div>
    </Dialog>
  )
}

DeleteDialog.propTypes = {
  onClose: PropTypes.func,
  id_booking: PropTypes.string
}

export default DeleteDialog