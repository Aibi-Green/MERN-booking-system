import { useEffect } from "react"
import { useAuthContext } from "./useAuthContext"
import { useNavigate } from "react-router-dom"

export const useIfNoToken = () => {
  const {token} = useAuthContext()
  const navigate = useNavigate()

  return useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token, navigate])
}