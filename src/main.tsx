import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterAsRouter } from "./router/Router.js"
import 'bootstrap/dist/css/bootstrap.min.css';
import './global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterAsRouter />
  </React.StrictMode>,
)