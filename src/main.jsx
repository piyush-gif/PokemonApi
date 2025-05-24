import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../style/navBar.css'
import '../style/homePage.css'
import '../style/pokeDex.css'
import '../style/index.css'
import App from './App.jsx'
import store from './store.jsx'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
