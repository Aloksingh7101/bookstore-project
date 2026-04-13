import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './app.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <div className=" dark:bg-slate-900 dark:text-white ">
  <App />
  </div>

  </BrowserRouter>
  //strict mode se 2 baar render hota hai 

  
    
  
)