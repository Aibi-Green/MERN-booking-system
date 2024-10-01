import PropTypes from 'prop-types'

function Logo({className}) {
  return (
    <div className={`flex h-full justify-center items-center ${className}`}>
      <div className="w-[60px] h-full flex justify-center items-center">
        {/* <h1 className="text-lg text-center">
          HH
        </h1> */}
        <img alt="logo" src=".\src\assets\logo no name.png" />
      </div>
    </div>
  )
}

Logo.propTypes = {
  className: PropTypes.string
}

export default Logo