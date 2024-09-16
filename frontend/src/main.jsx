import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'

import {BrowserRouter as Router} from "react-router-dom";
import AppRoutes from "./AppRoutes";
import {ScrollToTop} from './components/GenFuncs.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <ScrollToTop />
			<AppRoutes />
		</Router>
  </StrictMode>
)
