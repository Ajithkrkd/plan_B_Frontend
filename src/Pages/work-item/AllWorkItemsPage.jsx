import React from 'react'
import AllWorkItems from '../../Components/work-items/AllWorkItems'
import SideBar from '../../Components/SideBar/SideBar'
import Header from '../../Components/Header/Header'
function AllWorkItemsPage() {
  return (
    <div>
      <Header/>
      <SideBar/>
      <AllWorkItems/>
    </div>
  )
}

export default AllWorkItemsPage