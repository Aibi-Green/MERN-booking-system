import PropTypes from 'prop-types'

function Logo({className, white}) {
  return (
    <div className={`flex h-full justify-center items-center ${className}`}>
      <div className="w-[60px] h-full flex justify-center items-center">
        {/* <h1 className="text-lg text-center">
          HH
        </h1> */}
        {
          (!white) ?
          <img alt="logo" src=".\src\assets\logo no name.png" /> :
          <img alt="logo" src=".\src\assets\logo no name white.png" />
        }
      </div>
      <span className='font-serif'>Harmony Heights</span>
    </div>
  )
}

Logo.propTypes = {
  className: PropTypes.string,
  white: PropTypes.bool,
}

export default Logo