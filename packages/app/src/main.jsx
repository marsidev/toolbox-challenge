import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'
import './styles/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const root = document.getElementById('root')
createRoot(root).render(<App />)
