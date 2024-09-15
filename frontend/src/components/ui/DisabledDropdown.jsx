import PropTypes from 'prop-types'
import Input from './Input'
import { useRef, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react';

// data: should be array of objects for option
// id: used both in list for input and id for datalist

function DisabledDropdown({ id, data, className, onData, placeholder }) {

  const inputRef = useRef(null) // used to reference an element
  const [open, setOpen] = useState(false); // for opening list

  const setInput = (value) => {
    // update input value
    if (inputRef.current) {
      // set the value in the input field
      inputRef.current.value = value
      onData(inputRef.current.value)
      setOpen(false)
    }
  }

  return (
    <div className='relative'>

      <div className='flex relative h-[100%]'>
        <Input
          id={id} type={"text"} placeholder={placeholder} ref={inputRef}
          className={`pl-4 pr-10 py-3 appearance-none select rounded-md w-[100%] ${className}`}
          disabled />
        {
          (!open) ? (
            <ChevronDown onClick={() => setOpen(!open)} className='absolute h-[100%] right-0 w-[20%] px-2' />
          ) : (
            <ChevronUp onClick={() => setOpen(!open)} className='absolute h-[100%] right-0 w-[20%] px-2' />
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
  className: PropTypes.string
}

export default DisabledDropdown