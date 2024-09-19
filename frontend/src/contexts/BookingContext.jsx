import { createContext, useReducer} from 'react'
import PropTypes from 'prop-types'

export const BookingContext = createContext()

export const BookingsReducer = (state, action) => {
  switch( action.type ) {
    case 'SET_BOOKINGS':
      return {
        bookings: action.payload
      }
    case 'DELETE_BOOKING':
      return {
        bookings: state.bookings.filter(i => String(i._id) !== String(action.id))
      }
    default:
      console.log("Going to Booking Default state");
      return state
  }
}

export const BookingsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(BookingsReducer, {
      bookings: []
    })

    return (
        <BookingContext.Provider value={{...state, dispatch}}>
          {children}
        </BookingContext.Provider>
    )
}

BookingsContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}