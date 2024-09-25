import PropTypes from 'prop-types'

function Dialog({ children, className }) {
  return (
    <div className='bg-[#00000022] h-lvh w-lvw z-20 fixed left-0 top-0'>
      <div className={`bg-white absolute rounded-lg px-8 pt-10 pb-8 w-[90%] sm:w-[60%] max-w-[400px] bottom-[50%] right-[50%] transform translate-x-1/2 translate-y-1/2 flex flex-col items-center shadow-lg ${className}`}>
        {children}
      </div>
    </div>
  )
}

Dialog.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

export default Dialog