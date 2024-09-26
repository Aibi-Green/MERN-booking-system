import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'

import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { ScrollToTop } from './components/ScrollToTop.jsx'
import { BookingsContextProvider } from './contexts/BookingContext.jsx';
import { AuthContextProvider } from './contexts/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <ScrollToTop />
      <AuthContextProvider>
        <BookingsContextProvider>
          <AppRoutes />
        </BookingsContextProvider>
      </AuthContextProvider>
    </Router>
  </StrictMode>
)
