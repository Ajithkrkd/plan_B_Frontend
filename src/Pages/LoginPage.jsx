import React from 'react'
import Login from '../Components/Auth/Login/Login'
import Header from '../Components/Header/Header'
import SideBar from '../Components/SideBar/SideBar'

function LoginPage() {
  return (
    <div>
        <Header/>
        <SideBar/>
        <Login/>
    </div>
  )
}

export default LoginPage