import { SortAsc, SortDesc } from "lucide-react"
import { useState } from "react"
import PropTypes from 'prop-types'

function SortButton({ onData }) {
  const [ flip, setFlip ] = useState(false)

  // onData(flip)

  const handleClick = () => {
    setFlip(!flip)
    onData(!flip)
  }
  
  return (
    <button className="flex gap-2" onClick={handleClick}>
      {(!flip) ? <SortAsc /> : <SortDesc />}
      {(!flip) ? <span>Newest to Oldest</span> : <span>Oldest to Newest</span>}
    </button>
  )
}

SortButton.propTypes = {
  onData: PropTypes.func
}

export default SortButton