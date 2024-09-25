import { useEffect, useRef, useState } from 'react';
import Input from '../ui/Input';
import SearchButton from '../buttons/SearchButton';
import PropTypes from 'prop-types'
import AddButton from '../buttons/AddButton';
import DisabledDropdown from '../ui/DisabledDropDown';
import SortButton from '../buttons/SortButton';
import DateRange from '../ui/DateRange';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Label from '../ui/Label'
import { statuses } from '../../assets/Data';
import { useBookingsContext } from '../../hooks/useBookingsContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { getUserBookings } from '../../api/bookingsApi';

function SearchUserBookings({ className }) {
  const searchRef = useRef()
  const [status, setStatus] = useState("")
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [sort, setSort] = useState()
  const { dispatch } = useBookingsContext()
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const {token} = useAuthContext()

  const [form, setForm] = useState({
    search: null,
    status: null,
    date_sort: null,
    date_start: null,
    date_end: null
  })

  useEffect(() => {
    searchRef.current.value = (queryParams.get('search')) ? queryParams.get('search') : ""
    console.log(queryParams.get('status'));
    
    setStatus(queryParams.get('status'))
    // setStartDate(queryParams.get('date_start') && queryParams.get('date_start') != new Date(0).toISOString() ? new Date(queryParams.get('date_start')).toISOString() : null)
    // setEndDate(queryParams.get('date_end') && queryParams.get('date_end') != new Date(0).toISOString() ? new Date(queryParams.get('date_end')).toISOString() : null)
    // setSort(JSON.parse((queryParams.get('date_sort')) ? queryParams.get('date_sort') : false))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleForm = (e) => {    
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  // where to send out data
  const handleSubmit = (e) => {
    e.preventDefault()

    const queryStr = {}

    Object.keys(form).map((name) => {
      if (form[name]) {
        queryStr[name] = form[name]
      }
    })

    console.log(queryStr);
    
    const formattedUrlQuery = new URLSearchParams(queryStr).toString()

    navigate(`/userbookings?${formattedUrlQuery}`)
    
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-4 ${className}`}>

      {/* SEARCH INPUT and STATUS FILTER */}
      <div className='flex gap-1'>
        
        <Label htmlFor="search">
          <Input 
            id="search" name="search" placeholder="Search" 
            defaultValue={(form.search) ? form.search : null}
            onChange={handleForm} ref={searchRef}
            className="min-w-[100px] grow" />
        </Label>

        <DisabledDropdown 
          idNameFor="statusType" 
          onData={handleForm} 
          data={statuses} 
          initialVal={(status) ? status : "All"} 
          className="border min-w-[80px] grow" />

        <SearchButton 
          id="searchButton" 
          type="submit" 
          className="flex-initial" />

      </div>

      {/* SORT and DATE RANGE */}
      <div className='flex flex-row sm:flex-row justify-between gap-2 sm:gap-4 grow'>

        <div className='flex flex-col sm:gap-4 gap-2 items-start'>

          <SortButton 
            onData={(bool) => handleForm({target: {name: "date_sort", value: (bool != true) ? null : true}})} 
            initialVal={sort} />

          <DateRange 
            startData={(date_start) => handleForm(date_start)} 
            endData={(date_end) => handleForm(date_end)} 
            getParams={true} 
            noDaterestrictions={true} />
            
        </div>

        <div className='flex justify-end items-end'>
          
          <Link to={'/addbooking'}>
            <AddButton 
              text="Create Booking" 
              type="button" 
              className='bg-green-500 active:bg-green-600 active:text-white hover:bg-green-400'
            > Create Booking
            </AddButton>
          </Link>

        </div>

      </div>

    </form>
  )
}

SearchUserBookings.propTypes = {
  className: PropTypes.string,
  onData: PropTypes.func,
}

export default SearchUserBookings