import PropType from 'prop-types'

function CancelButton({onClick, className, children}) {
  return(
    <button onClick={onClick} className={`border-[3px] rounded-lg py-2 ${className}`}>{children}</button>
  )
}

CancelButton.propTypes = {
  children: PropType.node,
  onClick: PropType.func,
  className: PropType.string
}

export default CancelButton