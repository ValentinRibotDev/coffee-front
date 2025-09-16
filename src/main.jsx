import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './main.css'
import { Leva } from 'leva'

createRoot(document.getElementById('root')).render(
  
    <StrictMode>
      <Leva collapsed/>
      <App />
    </StrictMode>
  
)
