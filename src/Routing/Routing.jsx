import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Components/Login/Login'
import Register from '../Components/Register/Register'
import Dashboard from '../Components/Dashboard/Dashboard'
import AdminRegister from '../Components/Register/AdminRegister'

function Routing() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/admin' element={<AdminRegister />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default Routing
