import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function RegisterButton({ className, isLink = true, text }) {
  return (
    (isLink) ? (
      <Link 
        to="/register" 
        className={`rounded-lg bg-lime-500 active:bg-lime-600 font-semibold text-white py-2 text-center ${className}`}>
          {(text) ? text : "Register"}
      </Link>
    ) : (
      <button type="submit" className={`rounded-lg bg-lime-500 active:bg-lime-600 font-semibold text-white py-2 text-center ${className}`} >
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