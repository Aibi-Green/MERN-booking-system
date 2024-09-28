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

function SearchUserBookings({ className }) {
  const searchRef = useRef()
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const [form, setForm] = useState(() => {
    const obj = {
      search: '',
      status: '',
      date_sort: false,
      date_start: '',
      date_end: ''
    }

    for (const [param, value] of queryParams) {
      obj[param] = value
    }

    return obj
  })

  useEffect(() => {
    searchRef.current.value = form.search
  }, [searchRef, form.search])

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

        <Label htmlFor="search" className="grow">
          <Input
            id="search" name="search" placeholder="Search"
            onChange={handleForm} ref={searchRef}
            className="min-w-[100px]" />
        </Label>

        <DisabledDropdown
          idNameFor="statusType"
          onData={handleForm}
          data={statuses}
          initialVal={form.status}
          className="border min-w-[90px] grow" />

        <SearchButton
          id="searchButton"
          type="submit"
          className="flex-initial" />

      </div>

      {/* SORT and DATE RANGE */}
      <div className='flex flex-row sm:flex-row justify-between gap-2 sm:gap-4 grow'>

        <div className='flex flex-col sm:gap-4 gap-2 items-start'>

          <SortButton
            onData={(bool) => handleForm({ target: { name: "date_sort", value: (bool != true) ? null : true } })}
            initialVal={form.date_sort ? JSON.parse(form.date_sort) : false} />

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