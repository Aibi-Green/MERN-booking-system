import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function RegisterButton({ className }) {
  return (
    <Link 
      to="/register"
      className={`rounded-full bg-green-500 active:bg-green-600 font-semibold text-white hover:bg-green-400 py-2 flex justify-center items-center ${className}`}
    >
      Register
    </Link>
  )
}

RegisterButton.propTypes = {
  className: PropTypes.string
}

export default RegisterButton