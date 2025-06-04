import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../style/navBar.css'
import '../style/homePage.css'
import '../style/pokeDex.css'
import '../style/index.css'
import '../style/popup.css'
import App from './App.jsx'
import store from './store.jsx'
import { Provider } from 'react-redux'
import { ThemeProvider } from './theme';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)
