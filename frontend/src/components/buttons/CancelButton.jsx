import PropType from 'prop-types'
import { Link } from 'react-router-dom'

function CancelButton({ type, onClick, className, isLink = true, to, text }) {
  return (
    (isLink) ?
      <Link to={to}>
        <button onClick={onClick} className={`border-[3px] rounded-lg py-2 w-full ${className}`} type="button">
          {(text) ? text : "Cancel"}
        </button>
      </Link> :
      <button onClick={onClick} type={type} className={`border-[3px] rounded-lg py-2 ${className}`}>
        {(text) ? text : "Cancel"}
      </button>
  )
}

CancelButton.propTypes = {
  onClick: PropType.func,
  className: PropType.string,
  text: PropType.string,
  type: PropType.string,
  isLink: PropType.bool,
  to: PropType.string
}

export default CancelButton