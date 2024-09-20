import PropTypes from 'prop-types'
import { forwardRef } from 'react'

// Converted to forward Ref to pass ref to custom components
const numberInput = forwardRef((
  { id, list, value, placeholder, onClick, onChange, className, onFocus, 
    onBlur, disabled, name }, 
  ref) => {

  return (
    <input 
      id={id} list={list} name={name} value={value} type="number" placeholder={placeholder}
      onClick={onClick} onFocus={onFocus} onChange={onChange} onBlur={onBlur} ref={ref} 
      className={`p-3 rounded-md border ${className}`} disabled={disabled}
      onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')} />
  )
})

// needed for forward Ref
numberInput.displayName = "Input"

// ❕no need to include ref in proptypes
numberInput.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  id: PropTypes.string,
  list: PropTypes.string,
  className: PropTypes.string,
  labelFor: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string
}

export default numberInput