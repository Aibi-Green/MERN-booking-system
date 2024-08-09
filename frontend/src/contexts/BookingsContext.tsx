import { createContext, useReducer } from 'react'

export const BookingsContext = createContext([])

// the first parameter, state, is the previous state before we're
// making the change to it; a reliable previous state value

// the second parameter is the action type; what we want to 
// do with the data
export const BookingsReducer = (state: {bookings: [object]}, action: {type: string, payload: object}) => {
    switch (action.type) {
        case "SET_BOOKINGS":
            return {
                bookings: action.payload
            }
        case "CREATE_BOOKING":
            return {
                bookings: [action.payload, ...state.bookings]
            }
        // case "UPDATE_BOOKING":
        //     return {
        //         bookings: [action.payload, ...state.bookings]
        //     }
        // case "DELETE_BOOKING":
        //     return {
        //         bookings: [action.payload, ...state.bookings]
        //     }
        default:
            return state
    }
}

export const BookingsContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(BookingsReducer, {
        bookings: null
    })

    return (
        <BookingsContext.Provider value={{...state, dispatch}}>
            {children}
        </BookingsContext.Provider>
    )
}

