import { SortAsc, SortDesc } from "lucide-react"
import { useEffect, useState } from "react"
import PropTypes from 'prop-types'

function SortButton({ onData, initialVal }) {
  const [ flip, setFlip ] = useState(false)

  useEffect(() => {
    setFlip(initialVal)
  }, [initialVal])

  const handleClick = () => {
    setFlip(!flip)
    onData(!flip)
  }
  
  return (
    <button type="button" className="flex gap-2" onClick={handleClick}>
      {(!flip) ? <SortAsc /> : <SortDesc />}
      {(!flip) ? <span>Newest to Oldest</span> : <span>Oldest to Newest</span>}
    </button>
  )
}

SortButton.propTypes = {
  onData: PropTypes.func,
  initialVal: PropTypes.bool
}

export default SortButton