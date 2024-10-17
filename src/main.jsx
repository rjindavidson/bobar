import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import App from './app'
import Header from './components/header'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <App />
  </StrictMode>,
)
