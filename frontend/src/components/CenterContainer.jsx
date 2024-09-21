import PropTypes from 'prop-types'

function CenterContainer({children, className, ...props}) {
  return (
    <div {...props} className={`
    bg-white
    rounded-2xl
    px-10
    pt-[3rem]
    pb-[2rem]
    flex flex-col
    w-[95%]
    ${className}
    `}>
      {children}
    </div>
  )
}

CenterContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export default CenterContainer