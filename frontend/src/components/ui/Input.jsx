import PropTypes from 'prop-types'
import { forwardRef } from 'react'

// Converted to forward Ref to pass ref to custom components
const Input = forwardRef((
  { id, list, type, value, placeholder, onClick, onChange, className, onFocus, 
    onBlur, disabled }, 
  ref) => {
  return (
    <input 
      id={id} list={list} value={value} type={type} placeholder={placeholder}
      onClick={onClick} onFocus={onFocus} onChange={onChange} onBlur={onBlur} ref={ref} 
      className={`p-3 rounded-md border ${className}`} disabled={disabled} />
  )
})

// needed for forward Ref
Input.displayName = "Input"

// ❕no need to include ref in proptypes
Input.propTypes = {
  type: PropTypes.string,
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
  placeholder: PropTypes.string
}

export default Input