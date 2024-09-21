import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function LoginButton({ className, isLink = true, text }) {
  return (
    (isLink) ?
      <Link to='/login' className={`rounded-lg bg-slate-500 active:bg-slate-600 font-semibold text-white hover:bg-slate-400 py-2 text-center ${className}`}>
          {(text) ? text : "Login"}
      </Link>
      :
      <button
        type="submit"
        className={`rounded-lg bg-slate-500 active:bg-slate-600 font-semibold text-white hover:bg-slate-400 py-2 ${className}`}>
        {(text) ? text : "Login"}
      </button>
  )
}

LoginButton.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  isLink: PropTypes.bool
}

export default LoginButton