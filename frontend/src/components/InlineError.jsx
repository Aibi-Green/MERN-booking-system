import PropTypes from 'prop-types'

function InlineError({validations, property}) {
  return (
    <span className="text-red-400 text-sm">
      {(validations && validations[property]) ? validations[property] : ""}
    </span>
  )
}

InlineError.propTypes = {
  validations: PropTypes.object,
  property: PropTypes.string
}

export default InlineError