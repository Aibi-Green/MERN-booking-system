import PropTypes from 'prop-types'
import Input from './Input'
import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronUp, X } from 'lucide-react';

// data: should be array of objects for option
// id: used both in list for input and id for datalist

function Dropdown({ inputInitialValue, id, data, className, onData }) {
  const inputRef = useRef(null) // used to reference an element
  const [filterStr, setFilterStr] = useState("");
  const [open, setOpen] = useState(false); // for opening list
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    inputRef.current.value = (inputInitialValue) ? inputInitialValue : null
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(filterStr.length > 0) {
      setHidden(false)
    } else {
      setHidden(true)
    }
  }, [filterStr])

  const setInput = (value) => {    
    // update input value
    if (inputRef.current) {
      // set the value in the input field
      setFilterStr(value)
      inputRef.current.value = value
      onData(value)
      setOpen(false)
    }
  }

  const handleClear = () => {
    inputRef.current.value = ""
    setFilterStr("")
  }

  return (
    <div className='relative'>

      <div className='flex relative h-[100%]'>
        <Input
          id={id} type={"text"} placeholder="Select Status" ref={inputRef}
          onChange={(e) => setFilterStr(e.target.value)} // filters list
          // onFocus={() => setOpen(true)} // opens list
          // onBlur={() => setTimeout(() => { setOpen(false) }, 100)} // closes list, set to 100 so it can be executed
          className={`pl-4 pr-[90px] py-3 appearance-none select rounded-md w-[100%] ${className}`} />
          <X onClick={handleClear} className={`absolute right-[40px] h-[100%] w-[50px] px-3  ${hidden ? "hidden": ""}`} />
        {
          (!open) ? (
            <ChevronDown onClick={() => setOpen(!open)} className='absolute h-[100%] right-0 w-[50px] px-2' />
          ) : (
            <ChevronUp onClick={() => setOpen(!open)} className='absolute h-[100%] right-0 w-[50px] px-2' />
          )
        }
      </div>

      {/* Items */}
      {open &&
        <ul className={`absolute mt-2 bg-white w-[100%] rounded-b-md border shadow-md z-10`}>
          {
            data.filter((i) => {
              if(filterStr.toLowerCase() === '') {
                return i
              } else {
                return i.toLowerCase().includes(filterStr.toLowerCase())
              }
            }).map((i, index) => (
              <li key={(i._id) ? i._id : index} onClick={() => setInput(i)}
                className='py-2 px-4 hover:bg-slate-100'
              >{i}</li>
            ))
          }
        </ul>}

    </div>
  )
}

Dropdown.propTypes = {
  data: PropTypes.array,
  id: PropTypes.string,
  onData: PropTypes.func,
  className: PropTypes.string,
  inputInitialValue: PropTypes.string
}

export default Dropdown