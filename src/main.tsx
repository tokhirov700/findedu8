import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./i18n"; 
import Router from './router/index.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Router/>
  </StrictMode>,
)
