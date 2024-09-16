import PropTypes from 'prop-types'

function Dialog({ children }) {
  return (
    <div className='bg-[#00000022] h-lvh w-lvw z-20 fixed top-0'>
      <div className="dialog-container">
        {children}
      </div>
    </div>
  )
}

Dialog.propTypes = {
  children: PropTypes.node.isRequired
}

export default Dialog