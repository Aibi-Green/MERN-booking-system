import PropTypes from 'prop-types'

function ContentContainer({children, className, ...props}) {
  return (
    <div {...props} className={`container
    bg-white
    rounded-tl-2xl rounded-tr-2xl
    px-4 sm:px-10
    pt-[2rem] sm:pt-[3rem]
    pb-[4rem] min-h-lvh flex flex-col ${className}`}>
      {children}
    </div>
  )
}

ContentContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export default ContentContainer