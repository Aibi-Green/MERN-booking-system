import { Calendar } from "lucide-react"
import { useState } from "react"
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import PropTypes from 'prop-types'
import { minStartDateTime } from '../../assets/Data.jsx'
import { useLocation } from "react-router-dom"

function DateRange({ className, startClassName, initialStartDate, initialEndDate, endClassName, startData, endData, noDaterestrictions = false, noIcon = false, getParams = false }) {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const [startDate, setStartDate] = useState(
    (getParams) ? (
      queryParams.get('date_start') ?
        new Date(queryParams.get('date_start')) :
        null
    ) : (
      (initialStartDate) ? new Date(initialStartDate) : null
    )
  )
  const [endDate, setEndDate] = useState(
    (getParams) ? (
    queryParams.get('date_end') ?
      new Date(queryParams.get('date_end')) :
      null
    ) : (
      (initialEndDate) ? new Date(initialEndDate) : null
    )
  )

  const handleFormData = (name, date, onData) => {
    const isoDate = (date) => {
      return new Date(date).toISOString()
    }
    
    if(isoDate(date) != isoDate(0))
      onData({target: {name: name, value: isoDate(date)}})
    else
      onData({target: {name: name, value: null}})

    return date
  }

  return (
    <div className={`flex gap-3 items-center ${className}`}>
      {!noIcon && <Calendar />}
      <div className="flex flex-col gap-2">
        <div>
          <span className="mr-5 opacity-[0.7]">From</span>
          <DatePicker
            id="start-date"
            selectsStart
            showTimeSelect
            name="start-date"
            minTime={new Date(0, 0, 0, 6, 0)}
            maxTime={new Date(0, 0, 0, 23, 59)}
            minDate={(noDaterestrictions) ? "" : minStartDateTime}
            selected={startDate}
            onChange={(date) => setStartDate(handleFormData("date_start", date, startData))}
            dateFormat={"MM/dd/yy h:mmaa"}
            startDate={startDate}
            className={`rounded-full border bg-slate-100 px-3 py-1 ${startClassName}`}
            onKeyDown={(e) => {
              e.preventDefault();
            }}
            shouldCloseOnSelect showMonthDropdown showYearDropdown isClearable autoComplete="off"
          />
        </div>
        <div>
          <span className="mr-6 opacity-[0.7]">Until</span>
          <DatePicker
            id="end-date"
            selectsEnd
            showTimeSelect
            name="end-date"
            minTime={new Date(0, 0, 0, 6, 0)}
            maxTime={new Date(0, 0, 0, 23, 59)}
            selected={endDate}
            onChange={(date) => setEndDate(handleFormData("date_end", date, endData))}
            dateFormat={"MM/dd/yy h:mmaa"}
            endDate={endDate}
            startDate={startDate}
            minDate={startDate}
            className={`rounded-full border bg-slate-100 px-3 py-1 ${endClassName}`}
            onKeyDown={(e) => {
              e.preventDefault();
            }}
            shouldCloseOnSelect showMonthDropdown showYearDropdown isClearable autoComplete="off"
          />
        </div>
      </div>
      {/* <button type="button" onClick={handleClick}>SHOW DATES</button> */}
    </div>
  )
}

DateRange.propTypes = {
  noIcon: PropTypes.bool,
  className: PropTypes.string,
  initialStartDate: PropTypes.string,
  initialEndDate: PropTypes.string,
  startClassName: PropTypes.string,
  endClassName: PropTypes.string,
  startData: PropTypes.func,
  endData: PropTypes.func,
  noDaterestrictions: PropTypes.bool,
  getParams: PropTypes.bool
}

export default DateRange