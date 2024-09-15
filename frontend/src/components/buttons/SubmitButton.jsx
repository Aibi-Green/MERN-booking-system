import PropTypes from 'prop-types'

function SubmitButton({onClick, className, children}) {
  return (
    <button onClick={onClick} className={`bg-green-500 rounded-lg py-2 text-white ${className}`}>{children}</button>
  )
}

SubmitButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node
}

export default SubmitButton