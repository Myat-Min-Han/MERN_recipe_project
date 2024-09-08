import React from 'react'
import ReactDOM from 'react-dom/client'
import {AuthContextProvider} from './context/AuthContext.jsx';
import Route from './routes/route.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <Route/>
    </AuthContextProvider>
  </React.StrictMode>
)
