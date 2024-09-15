import PropTypes from 'prop-types'

function SearchButton({ id, text, type, onClick, className, children }) {
  return (
    <button id={id} type={type} onClick={onClick}
      className={`${className} cursor-pointer opacity-80 
      rounded-full pl-2 sm:pl-4 pr-2 border flex justify-between gap-1 items-center
      `}>
        {text && <span>{text}</span>}
      {children}
    </button>
  )
}

SearchButton.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default SearchButton