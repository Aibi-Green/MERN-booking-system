import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function RegisterButton({ className, isLink = true, text }) {
  return (
    (isLink) ? (
      <Link to="/register" className={`rounded-lg bg-green-500 active:bg-green-600 font-semibold text-white hover:bg-green-400 py-2 text-center ${className}`}>
        {(text) ? text : "Register"}
      </Link>
    ) : (
      <button type="submit" className={`rounded-lg bg-green-500 active:bg-green-600 font-semibold text-white hover:bg-green-400 py-2 text-center ${className}`} >
        {(text) ? text : "Register"}
      </button>
    )
  )
}

RegisterButton.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  isLink: PropTypes.bool
}

export default RegisterButton