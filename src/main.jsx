import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../style/navBar.css'
import '../style/homePage.css'
import '../style/pokeDex.css'
import '../style/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <App />
  </StrictMode>,
)
