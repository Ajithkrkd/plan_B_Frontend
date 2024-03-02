import React from 'react'
import Register from '../Components/Auth/Register/Register'
import Header from '../Components/Header/Header'
import SideBar from '../Components/SideBar/SideBar'

function RegisterPage() {
  return (
    <div>
        <Header/>
        <SideBar/>
        <Register/>
    </div>
  )
}

export default RegisterPage