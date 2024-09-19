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

function SearchUserBookings({ className }) {
  const searchRef = useRef(null)
  const [status, setStatus] = useState("")
  const [searchStr, setSearchStr] = useState()
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [sort, setSort] = useState(false)
  const { dispatch } = useBookingsContext()
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  useEffect(() => {
    console.log(location.search);

    searchRef.current.value = queryParams.get('searchStr')
    setSearchStr((queryParams.get('searchStr')) ? queryParams.get('searchStr') : "")

    setStatus(queryParams.get('status'))

    console.log(queryParams.get('date_start'))
    setStartDate(queryParams.get('date_start'))
    // const dateEnd = queryParams.get('date_end');

    setSort(JSON.parse(queryParams.get('date_sort')))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleStatus = (data) => {
    if (statuses.includes(data)) {
      setStatus(data)
    }
  }

  // where to send out data
  const handleSubmit = (e) => {
    e.preventDefault()

    const queryString = new URLSearchParams({
      searchStr: searchStr,
      status: (status) ? status : "All",
      date_start: (startDate) ? startDate.toISOString() : null,
      date_end: (endDate) ? endDate.toISOString() : null,
      date_sort: sort
    }).toString()

    navigate(`/userbookings?${queryString}`)
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
          <DateRange initialStartDate={startDate} startData={setStartDate} endData={setEndDate} noDaterestrictions={true} />
        </div>

        <div className='flex justify-end items-end'>
          <Link to={'/addbooking'}>
            <AddButton className='p-1' />
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