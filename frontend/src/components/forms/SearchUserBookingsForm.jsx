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
import { getUserBookings } from '../../api/bookingsApi';
import { useAuthContext } from '../../hooks/useAuthContext';
import { jwtDecode } from 'jwt-decode';

function SearchUserBookings({ className }) {
  const searchRef = useRef(null)
  const [status, setStatus] = useState("")
  const [searchStr, setSearchStr] = useState()
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [sort, setSort] = useState()
  const { dispatch } = useBookingsContext()
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const {token} = useAuthContext()

  useEffect(() => {

    searchRef.current.value = queryParams.get('searchStr')
    setSearchStr((queryParams.get('searchStr')) ? queryParams.get('searchStr') : "")
    setStatus(queryParams.get('status'))
    setStartDate(queryParams.get('date_start') && queryParams.get('date_start') != new Date(0).toISOString() ? new Date(queryParams.get('date_start')).toISOString() : null)
    setEndDate(queryParams.get('date_end') && queryParams.get('date_end') != new Date(0).toISOString() ? new Date(queryParams.get('date_end')).toISOString() : null)
    setSort(JSON.parse((queryParams.get('date_sort')) ? queryParams.get('date_sort') : false))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleStatus = (data) => {
    if (statuses.includes(data)) {
      setStatus(data)
    }
  }

  useEffect(() => {
    getUserBookings(jwtDecode(token)._id, location.search, dispatch)
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search])

  // where to send out data
  const handleSubmit = (e) => {
    e.preventDefault()

    const queryString = {
      searchStr: searchStr,
      status: (status) ? status : "All",
      date_sort: sort
    }

    if (startDate != null) {
      queryString.date_start = (startDate) ? new Date(startDate).toISOString() : null
    } else {
      if(queryString.date_start)
          delete queryString.date_start
    }

    if (endDate != null) {
      queryString.date_end = (endDate) ? new Date(endDate).toISOString() : null
    } else {
      if(queryString.date_end)
        delete queryString.date_end
    }

    const formattedQueryString = new URLSearchParams(queryString).toString()

    navigate(`/userbookings?${formattedQueryString}`)

    console.log({
      searchStr: searchStr,
      status: status,
      date_start: startDate,
      date_end: endDate,
      sort: sort
    });
    
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-4 ${className}`}>

      {/* SEARCH INPUT and STATUS FILTER */}
      <div className='flex gap-1'>
        <Label htmlFor="searchInput"></Label>
        <Input id="searchInput" name="searchInput" placeholder="Search" ref={searchRef} onChange={() => setSearchStr(searchRef.current.value)} className="min-w-[100px] grow" />
        <DisabledDropdown idNameFor="statusType" onData={handleStatus} data={statuses} initialVal={(status) ? status : "All"} className="border min-w-[80px] grow" />
        <SearchButton id="searchButton" type="submit" className="flex-initial" />
      </div>

      {/* SORT and DATE RANGE */}
      <div className='flex flex-row sm:flex-row justify-between gap-2 sm:gap-4 grow'>

        <div className='flex flex-col sm:gap-4 gap-2 items-start'>
          <SortButton onData={setSort} initialVal={sort} />
          <DateRange startData={(d) => {
              if(new Date(d).toISOString() != new Date(0).toISOString())
                setStartDate(new Date(d).toISOString())
              else
                setStartDate(null)
            }} endData={(d) => {
              if(new Date(d).toISOString() != new Date(0).toISOString())
                setEndDate(new Date(d).toISOString())
              else
                setEndDate(null)
            }} getParams={true} noDaterestrictions={true} />
        </div>

        <div className='flex justify-end items-end'>
          <Link to={'/addbooking'}>
            <AddButton text="Create Booking" type="button" className='bg-green-500 active:bg-green-600 active:text-white hover:bg-green-400'>Create Booking</AddButton>
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