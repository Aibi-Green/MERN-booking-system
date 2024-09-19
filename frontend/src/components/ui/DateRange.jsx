import { Calendar } from "lucide-react"
import { useEffect, useState } from "react"
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import PropTypes from 'prop-types'
import { minStartDateTime } from '../../assets/Data.jsx'

function DateRange({ className, startClassName, endClassName, startData, endData, initialStartDate, initialEndDate, noDaterestrictions=false, noIcon=false }) {
  const [startDate, setStartDate] = useState((initialStartDate) ? new Date(initialStartDate) : null)
  const [endDate, setEndDate] = useState((initialEndDate) ? new Date(initialEndDate) : null)

  useEffect(() => {
    // if (initialStartDate == null) {
    //   setStartDate((initialStartDate) ? new Date(initialStartDate) : null)
    // } else {
    //   console.log(startDate)
    // }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialStartDate])

  const handleStartDate = (date) => {
    setStartDate(date)
    startData(date)
  }

  const handleEndDate = (date) => {
    setEndDate(date)
    endData(date)
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
            minTime={new Date(0, 0, 0, 6, 0)}
            maxTime={new Date(0, 0, 0, 23, 59)}
            minDate={(noDaterestrictions) ? "" : minStartDateTime}
            selected={startDate}
            onChange={(date) => handleStartDate(date)}
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
            minTime={new Date(0, 0, 0, 6, 0)}
            maxTime={new Date(0, 0, 0, 23, 59)}
            selected={endDate}
            onChange={(date) => handleEndDate(date)}
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
    </div>
  )
}

DateRange.propTypes = {
  noIcon: PropTypes.bool,
  className: PropTypes.string,
  startClassName: PropTypes.string,
  endClassName: PropTypes.string,
  initialStartDate: PropTypes.string,
  initialEndDate: PropTypes.func,
  startData: PropTypes.func,
  endData: PropTypes.func,
  noDaterestrictions: PropTypes.bool
}

export default DateRange