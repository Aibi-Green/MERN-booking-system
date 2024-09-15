import { LucideSearch } from 'lucide-react'
import PropTypes from 'prop-types'

function SearchButton({ id, text, type, onClick, className }) {
  return (
    <button id={id} type={type} onClick={onClick}
      className={`${className} cursor-pointer opacity-80 bg-slate-100 
      rounded-md px-2 border flex justify-center items-center`}>
        {text && <span>{text}</span>}
      <LucideSearch className={`size-8`} />
    </button>
  )
}

SearchButton.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string
}

export default SearchButton