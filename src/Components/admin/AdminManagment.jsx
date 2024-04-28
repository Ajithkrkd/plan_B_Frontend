import React from 'react'
import Header from './Header'
import SideBar from "../../Components/SideBar/SideBar"
const AdminManagment = () => {
  return (
    <>

    <Header/>
    <SideBar/>
    <div className='project-container'>
      <p className='text-2xl'>ADMIN DASHBOARD</p>
    </div>
    </>
  )
}

export default AdminManagment