import Dialog from "./ui/Dialog";
import PropTypes from 'prop-types'
import CancelButton from './buttons/CancelButton.jsx'
import SubmitButton from './buttons/SubmitButton.jsx'
import { deleteBooking } from "../api/bookingsApi.jsx";
import { useBookingsContext } from "../hooks/useBookingsContext.jsx";

function DeleteDialog({ onClose, id }) {
  const {dispatch} = useBookingsContext()

  const handleClose = () => {
    onClose(true)
  }
  
  const handleDelete = () => {
    console.log("Sending delete booking request...");
    deleteBooking(id, dispatch)
    
    handleClose()
  }

  return (
    <Dialog className="text-center">
      <h4 className="text-xl">Do you want to delete this booking? {id}</h4>
      <div className="flex flex-row w-full sm:min-w-[300px] mt-8 gap-3">
        <SubmitButton onClick={() => handleDelete()} className="basis-[50%]">Yes</SubmitButton>
        <CancelButton onClick={() => handleClose()} className="basis-[50%]" isLink={false} />
      </div>
    </Dialog>
  )
}

DeleteDialog.propTypes = {
  onClose: PropTypes.func,
  id: PropTypes.string
}

export default DeleteDialog