import { useRef, useState } from 'react';
import Input from './ui/Input';
import SearchButton from './buttons/SearchButton';
import PropTypes from 'prop-types'
import AddButton from './buttons/AddButton';
import DisabledDropdown from './ui/DisabledDropDown';
import SortButton from './buttons/SortButton';
import DateRange from './ui/DateRange';
import { statuses } from '../assets/Data';
import { Link } from 'react-router-dom';

function SearchUserBookings({ className, onData }) {
  const searchRef = useRef(null)
  const [status, setStatus] = useState("")
  const [searchStr, setSearchStr] = useState("")
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [sort, setSort] = useState(false)

  const handleStatus = (data) => {
    if (statuses.includes(data)) {
      setStatus(data)
    }
  }

  const handleSort = (data) => {    
    setSort(data)
  }

  // where to send out data
  const handleSearchButton = () => {
    onData({
      search: searchStr,
      status: (status) ? status : "All",
      date_start: startDate,
      date_end: endDate,
      sort: sort
    })
  }

  return (
    <div className={`flex flex-col gap-4 ${className}`}>

      {/* SEARCH INPUT and STATUS FILTER */}
      <div className='flex gap-1'>
        <Input placeholder="Search" ref={searchRef} onChange={() => setSearchStr(searchRef.current.value)} className="min-w-[100px] grow" />
        <DisabledDropdown onData={handleStatus} data={statuses} placeholder="All" initialVal="All" className="border min-w-[80px] grow" />
        <SearchButton id="searchButton" type="button" onClick={(e) => handleSearchButton(e)} className="flex-initial" />
      </div>

      {/* SORT and DATE RANGE */}
      <div className='flex flex-row sm:flex-row justify-between gap-2 sm:gap-4 grow'>

        <div className='flex flex-col sm:gap-4 gap-2 items-start'>
          <SortButton onData={handleSort} />
          <DateRange startData={setStartDate} endData={setEndDate} noDaterestrictions={true} />
        </div>

        <div className='flex justify-end items-end'>
          <Link to={'/addbooking'}>
            <AddButton className='p-1' />
          </Link>
        </div>

      </div>

    </div>
  )
}

SearchUserBookings.propTypes = {
  className: PropTypes.string,
  onData: PropTypes.func,
}

export default SearchUserBookings