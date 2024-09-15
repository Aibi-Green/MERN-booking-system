import { Calendar } from "lucide-react"
import { useState } from "react"
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import PropTypes from 'prop-types'
import { minStartDateTime } from '../../assets/Data.jsx'

function DateRange({ className, startClassName, endClassName, startData, endData, noIcon=false }) {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

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
            selectsStart
            showTimeSelect
            minTime={new Date(0, 0, 0, 6, 0)}
            maxTime={new Date(0, 0, 0, 23, 59)}
            minDate={minStartDateTime}
            selected={startDate}
            onChange={(date) => handleStartDate(date)}
            dateFormat={"MM/dd/yy h:mmaa"}
            startDate={startDate}
            className={`rounded-full border bg-slate-100 px-3 py-1 ${startClassName}`}
            onKeyDown={(e) => {
              e.preventDefault();
            }}
            shouldCloseOnSelect showMonthDropdown showYearDropdown isClearable
          />
        </div>
        <div>
          <span className="mr-6 opacity-[0.7]">Until</span>
          <DatePicker
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
            shouldCloseOnSelect showMonthDropdown showYearDropdown isClearable
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
  startData: PropTypes.func,
  endData: PropTypes.func
}

export default DateRange