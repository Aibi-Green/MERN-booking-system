import PropType from 'prop-types'

function FormErrors({errorArr}) {
  return (
    <div className='flex flex-col items-center text-red-600'>
      {
        errorArr.map((e, i) => (
          <div key={i}>{e}</div>
        ))
      }
    </div>
  )
}

FormErrors.propTypes = {
  errorArr: PropType.array
}



export default FormErrors