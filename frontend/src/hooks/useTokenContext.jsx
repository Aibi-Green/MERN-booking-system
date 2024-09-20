import { useContext } from "react"
import { TokenContext } from "../contexts/TokenContext"

export const useTokenContext = () => {
  const context = useContext(TokenContext)

  if(!context) {
    throw Error('useTokenContext must be used inside a TokenContextProvider')
  }

  return context
}