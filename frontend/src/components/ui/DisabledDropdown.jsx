import PropTypes from 'prop-types'
import Input from './Input'
import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react';
import Label from './Label';

// data: should be array of objects for option
// id: used both in list for input and id for datalist

function DisabledDropdown({ idNameFor, data, className, onData, placeholder, initialVal }) {

  const inputRef = useRef(null) // used to reference an element
  const [open, setOpen] = useState(false); // for opening list

  useEffect(() => {
    inputRef.current.value = (initialVal) ? initialVal : "All"
  }, [initialVal])

  const setInput = (value) => {
    if (inputRef.current) {
      inputRef.current.value = value
      onData({target: {name: 'status', value: value}})
      setOpen(false)
    }
  }

  return (
    <div className='relative'>

      <div className='flex relative h-[100%]'>
        <Label htmlFor={idNameFor} />
        <Input
          id={idNameFor} name={idNameFor} placeholder={placeholder} type={"text"} ref={inputRef}
          className={`pl-4 pr-10 py-3 appearance-none select rounded-md w-[100%] ${className}`}
          disabled />
        {
          (!open) ? (
            <ChevronDown onClick={() => setOpen(!open)} className='absolute h-[100%] right-0 w-[40px] px-2' />
          ) : (
            <ChevronUp onClick={() => setOpen(!open)} className='absolute h-[100%] right-0 w-[40px] px-2' />
          )
        }
      </div>

      {/* Items */}
      {open &&
        <ul className={`absolute mt-2 bg-white w-[100%] rounded-b-md border shadow-md z-10`}>
          {
            data.map((o, i) => (
              <li key={i} onClick={() => setInput(o)}
                className='py-2 px-4 hover:bg-slate-100'
              >{o}</li>
            ))
          }
        </ul>}

    </div>
  )
}

DisabledDropdown.propTypes = {
  data: PropTypes.array,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  onData: PropTypes.func,
  className: PropTypes.string,
  idNameFor: PropTypes.string,
  initialVal: PropTypes.string
}

export default DisabledDropdown