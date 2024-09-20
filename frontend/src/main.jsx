import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'

import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { ScrollToTop } from './components/GenFuncs.jsx'
import { BookingsContextProvider } from './contexts/BookingContext.jsx';
import { TokenContextProvider } from './contexts/TokenContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <ScrollToTop />
      <TokenContextProvider>
        <BookingsContextProvider>
          <AppRoutes />
        </BookingsContextProvider>
      </TokenContextProvider>
    </Router>
  </StrictMode>
)
