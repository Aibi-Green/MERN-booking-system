import PropTypes from 'prop-types'

function Label ({ text, htmlFor, className, children }) {
    return(
        <label htmlFor={htmlFor} className='flex flex-col'>
            {/* show text if it exists */}
            {text && <span className={`mb-1 font-semibold ${className}`}>{text}</span>}
            {children}
        </label>
    )
}

Label.propTypes = {
    children: PropTypes.node,
    text: PropTypes.string,
    htmlFor: PropTypes.string,
    className: PropTypes.string
}

export default Label