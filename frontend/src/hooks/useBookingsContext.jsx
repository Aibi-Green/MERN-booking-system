import { useContext } from "react"
import { BookingContext } from "../contexts/BookingContext"

export const useBookingsContext = () => {
  const context = useContext(BookingContext)

  if(!context) {
    throw Error('useBookingsContex must be used inside a BookingsContextProvider')
  }

  return context
}