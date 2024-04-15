import React from 'react'
import AllWorkLifeCycle from '../../Components/work-items/work-life-cycle/AllWorkLifeCycle'
import Header from '../../Components/Header/Header'
import SideBar from '../../Components/SideBar/SideBar'
function WorkLifeCyclePage() {
  return (
    <div>
        <Header/>
        <SideBar/>
        <AllWorkLifeCycle/>
    </div>
  )
}

export default WorkLifeCyclePage