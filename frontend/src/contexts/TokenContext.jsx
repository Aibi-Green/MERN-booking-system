import { createContext, useReducer} from 'react'
import PropTypes from 'prop-types'

export const TokenContext = createContext()

export const TokenReducer = (state, action) => {
  switch( action.type ) {
    case 'SET_TOKEN':
      return {
        token: action.payload
      }
    case 'DELETE_TOKEN':
      return {
        token: ""
      }
    default:
      return state
  }
}

export const TokenContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(TokenReducer, {
      token: ""
    })

    return (
        <TokenContext.Provider value={{...state, dispatch}}>
          {children}
        </TokenContext.Provider>
    )
}

TokenContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}