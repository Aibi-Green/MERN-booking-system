import PropTypes from 'prop-types'
import { forwardRef } from 'react'

// Converted to forward Ref to pass ref to custom components
const Input = forwardRef((
  { id, name, list, type, value, placeholder, onClick, onChange, className, onFocus,
    onBlur, disabled, icon },
  ref) => {
  return (
    (!icon) ? (
      <input
        id={id} name={name} list={list} value={value} type={type} placeholder={placeholder}
        onClick={onClick} onFocus={onFocus} onChange={onChange} onBlur={onBlur} ref={ref}
        className={`p-3 rounded-md border ${className}`} disabled={disabled} />
    ) : (
      <div className='flex flex-row'>
        <input
          id={id} name={name} list={list} value={value} type={type} placeholder={placeholder}
          onClick={onClick} onFocus={onFocus} onChange={onChange} onBlur={onBlur} ref={ref}
          className={`p-3 rounded-l-md border w-full ${className}`} disabled={disabled} />
        <div className='bg-slate-300 rounded-r-md w-[50px] flex justify-center items-center'>
          {icon}
        </div>
      </div>
    )
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
  placeholder: PropTypes.string,
  icon: PropTypes.node,
  name: PropTypes.string
}

export default Input