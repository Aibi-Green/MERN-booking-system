import PropTypes from 'prop-types'

function SubmitButton({type, onClick, className, children}) {
  return (
    <button onClick={onClick} type={type} className={`bg-green-500 rounded-lg py-2 text-white ${className}`}>{children}</button>
  )
}

SubmitButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.string
}

export default SubmitButton