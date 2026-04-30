import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TaskProvider } from './core/store/TaskContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TaskProvider>
      <App />
    </TaskProvider>
  </StrictMode>,
)
