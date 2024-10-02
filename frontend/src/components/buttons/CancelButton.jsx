import PropType from 'prop-types'
import { Link } from 'react-router-dom'

function CancelButton({ type, onClick, className, isLink = true, to, text }) {
  return (
    (isLink) ?
      <Link to={to} onClick={onClick} className={`bg-slate-500 hover:bg-slate-500 text-white text-center rounded-lg py-2 ${className}`}>
        {(text) ? text : "Cancel"}
      </Link> :
      <button onClick={onClick} type={type} className={`bg-slate-500 hover:bg-slate-600 text-white text-center  rounded-lg py-2 ${className}`}>
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