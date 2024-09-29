import { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { jwtDecode } from 'jwt-decode'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [loggedInUserId] = useState(() => {
    const savedToken = localStorage.getItem('authToken')

    if (savedToken) {
      const userId = jwtDecode(savedToken)._id
      return userId
    }
    
    return ""
  })
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem('authToken')
    
    let expiry = 0
    if (savedToken) {
      expiry = jwtDecode(savedToken).exp * 1000
      // console.log("expiry: ", expiry)
    }

    if (savedToken && expiry) {
      const now = new Date()
      // console.log("now.getTime() > expiry: ", now.getTime(), " > ", expiry, " = ", now.getTime() > expiry);
      
      if (now.getTime() > expiry) {
        localStorage.removeItem('authToken')
        return null
      }
      return savedToken
    }
    return null
  })
  const [email, setEmail] = useState(() => {
    const savedToken = localStorage.getItem('authToken')
    const email = localStorage.getItem('email')

    let expiry = 0
    if (savedToken) {
      expiry = jwtDecode(savedToken).exp * 1000
    }

    if (email && expiry) {
      const now = new Date()
      
      if (now.getTime() > expiry) {
        localStorage.removeItem('email')
        return null
      }
      return email
    }
    return null

  })

  const loginNewToken = (newToken, email) => {
    localStorage.setItem('authToken', newToken)
    // TODO: change to jwtdecode
    localStorage.setItem('email', email) 
    setToken(newToken)
    setEmail(email)
  }

  const logoutRemoveToken = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('email')
    setToken(null)
    setEmail(null)
  }

  useEffect(() => {
    if (token) {
      const expiry = jwtDecode(localStorage.getItem('authToken')).exp * 1000;
      // console.log("expiry", expiry);
      
      const timeRemaining = expiry - new Date().getTime();

      // Automatically log out when token expires
      const timeoutId = setTimeout(() => {
        logoutRemoveToken();
      }, timeRemaining);

      return () => clearTimeout(timeoutId); // Clear timeout if token changes
    }
  }, [token])

  return (
    <AuthContext.Provider value={{ token, email, loggedInUserId, loginNewToken, logoutRemoveToken }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}