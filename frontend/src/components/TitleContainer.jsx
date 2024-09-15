import PropTypes from 'prop-types'

function TitleContainer({children}) {
  return (
    <div className='container min-h-[5rem] sm:min-h-[8rem] flex '>
      <h1 className='text-2xl sm:text-3xl self-end mb-3 ml-3 sm:mb-5 font-bold uppercase opacity-70'>
        {children}
      </h1>
      {/* <hr className='bg-black opacity-[0.2] h-[3px] w-[40%] sm:w-[50%]' /> */}
    </div>
  )
}

TitleContainer.propTypes = {
  children: PropTypes.node
}

export default TitleContainer