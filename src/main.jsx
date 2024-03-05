import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../src/index.css'
import { Toaster } from "react-hot-toast";
import { UrlProvider } from './store/urlContext.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <UrlProvider>
     <App />
     <Toaster position="top-right" reverseOrder={false} />
     </UrlProvider>
  </React.StrictMode>,
)
