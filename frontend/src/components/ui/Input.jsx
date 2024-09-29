import PropTypes from 'prop-types'
import { forwardRef } from 'react'
import LoaderIcon from './LoaderIcon'
import { Check } from 'lucide-react'

// Converted to forward Ref to pass ref to custom components
const Input = forwardRef((
  { id, name, list, type, value, placeholder, onClick, onChange, className, onFocus,
    onBlur, disabled, icon, withCheck, loading, defaultValue },
  ref) => {
  return (
    (icon) ? (
      <div className='flex flex-row'>
        <input
          id={id} name={name} list={list} value={value} type={type} placeholder={placeholder}
          onClick={onClick} onFocus={onFocus} onChange={onChange} onBlur={onBlur} ref={ref}
          className={`p-3 rounded-l-md border w-full ${className}`} disabled={disabled} />
        <div className='border border-slate-200 bg-slate-100 rounded-r-md w-[60px] flex justify-center items-center'>
          {icon}
        </div>
      </div>
    ) : ((withCheck) ? (
      <div className="flex flex-row relative">
      <Input id={id} name={name} list={list} value={value} type={type} placeholder={placeholder}
          onClick={onClick} onFocus={onFocus} onChange={onChange} onBlur={onBlur} ref={ref}
          className="w-full pr-[60px]" />
      <div className="absolute w-[60px] h-full flex justify-center items-center right-0">
        {
          (loading) ? 
            <LoaderIcon className="" iconClassName="text-red-500 size-8" />
          :
            <Check className="text-green-600" />
        }
      </div>
    </div>
    ) : (
      <input
        id={id} name={name} list={list} value={value} type={type} placeholder={placeholder}
        onClick={onClick} onFocus={onFocus} onChange={onChange} onBlur={onBlur} defaultValue={defaultValue} ref={ref}
        className={`p-3 rounded-md border ${className}`} disabled={disabled} />
    ))
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
  name: PropTypes.string,
  withCheck: PropTypes.bool,
  loading: PropTypes.bool,
  defaultValue: PropTypes.string
}

export default Input