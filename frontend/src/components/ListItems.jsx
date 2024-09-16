import PropTypes from 'prop-types'
import ItemBooking from './ItemBooking.jsx'

function ListItems({ data, onDelete }) {

  return (
    <div className='flex flex-col gap-4 pb-[8rem]'>
      {
        data.map((i) => (
          <ItemBooking key={i._id} data={i} onDelete={onDelete} />
        ))
      }
    </div>
  )
}

ListItems.propTypes = {
  data: PropTypes.array,
  onDelete: PropTypes.func
}

export default ListItems