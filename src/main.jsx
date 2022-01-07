import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import App from './App'
import SignUp from './auth-pages/SignUp'
import Login from './auth-pages/Login'
import ResetPass from './auth-pages/ResetPass'

ReactDOM.render(
  // <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/login' element={<Login />} />
        <Route path='reset-pass' element={<ResetPass />} />
      </Routes>
    </BrowserRouter>
  // </React.StrictMode>
  ,
  document.getElementById('root')
)
