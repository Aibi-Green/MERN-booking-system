import PropTypes from 'prop-types'
import { Plus } from 'lucide-react'

function AddButton({ id, text, type, onClick, className }) {
  return (
    <button id={id} type={type} onClick={onClick}
      className={`cursor-pointer opacity-80 rounded-full pl-2 sm:pl-4 pr-2 border flex justify-between gap-1 items-center py-2 ${className}`}>
      <span className='hidden sm:block'>{text}</span>
      <Plus className='size-8' />
    </button>
  )
}

AddButton.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func
}

export default AddButton