import * as React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router } from "react-router-dom"
import AppRoutes from "./AppRoutes"
import { BookingsContextProvider } from './contexts/BookingsContext'
import { AuthContextProvider } from './contexts/AuthContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <BookingsContextProvider>
        <Router>
          <AppRoutes />
        </Router>
      </BookingsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
