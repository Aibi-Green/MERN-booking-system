import PropTypes from 'prop-types'
import { forwardRef } from 'react'

// Converted to forward Ref to pass ref to custom components
const numberInput = forwardRef((
  { id, value, placeholder, onClick, onChange, className, onFocus, 
    onBlur, name }, 
  ref) => {

  return (
    <input 
      id={id} name={name} value={value} type="number" placeholder={placeholder}
      onClick={onClick} onFocus={onFocus} onChange={onChange} onBlur={onBlur} ref={ref} 
      className={`p-3 rounded-md border ${className}`} min="1" max="5000"
      onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')} />
  )
})

// needed for forward Ref
numberInput.displayName = "Input"

// ❕no need to include ref in proptypes
numberInput.propTypes = {
  value: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  id: PropTypes.string,
  className: PropTypes.string,
  labelFor: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string
}

export default numberInput