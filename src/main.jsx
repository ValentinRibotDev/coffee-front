import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

//Controls
import { Leva } from 'leva'

//CSS
import './main.css'

createRoot(document.getElementById('root')).render(
  
    <StrictMode>
      <Leva collapsed/>
      <App />
    </StrictMode>
  
)
