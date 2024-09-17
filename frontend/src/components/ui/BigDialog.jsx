import PropTypes from 'prop-types'

function BigDialog({ children, className }) {
  return (
    <div className='bg-[#00000022] h-lvh w-lvw z-20 fixed top-0'>
      <div className={`bg-white absolute rounded-lg px-8 pt-10 pb-8 w-[80%] sm:w-[90%] max-w-[600px] bottom-[50%] right-[50%] transform translate-x-1/2 translate-y-1/2 flex flex-col items-center shadow-lg max-h-lvh overflow-auto ${className}`}>
        {children}
      </div>
    </div>
  )
}

BigDialog.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

export default BigDialog