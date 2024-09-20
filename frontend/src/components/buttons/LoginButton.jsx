import PropTypes from 'prop-types'

function LoginButton({ className }) {
  return (
    <button 
      type="submit"
      className={`rounded-full bg-slate-500 active:bg-slate-600 font-semibold text-white hover:bg-slate-400 py-2 ${className}`}>
      Login
    </button>
  )
}

LoginButton.propTypes = {
  className: PropTypes.string
}

export default LoginButton