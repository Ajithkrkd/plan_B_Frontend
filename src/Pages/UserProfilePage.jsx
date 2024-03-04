import React from 'react'
import Header from '../Components/Header/Header'
import SideBar from '../Components/SideBar/SideBar'
import UserProfile from '../Components/User/UserProfile'

function UserProfilePage() {
  return (
    <div>
        <Header/>
        <SideBar/>
        <UserProfile/>
    </div>
  )
}

export default UserProfilePage