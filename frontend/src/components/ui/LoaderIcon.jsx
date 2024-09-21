import PropTypes from 'prop-types'

function LoaderIcon({className, iconClassName}) {
  return (
    <div className={`w-full h-full flex justify-center items-center ${className}`}>
      <div className={`loader ${iconClassName}`}></div>
    </div>
  )
}

LoaderIcon.propTypes = {
  className: PropTypes.string,
  iconClassName: PropTypes.string
}

export default LoaderIcon