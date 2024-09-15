import PropType from 'prop-types'

function CancelButton({type, onClick, className, children}) {
  return(
    <button onClick={onClick} type={type} className={`border-[3px] rounded-lg py-2 ${className}`}>{children}</button>
  )
}

CancelButton.propTypes = {
  children: PropType.node,
  onClick: PropType.func,
  className: PropType.string,
  type: PropType.string
}

export default CancelButton