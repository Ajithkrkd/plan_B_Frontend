import React from 'react'
import Board from '../../Components/boards/Board'
import Header from '../../Components/Header/Header'
import SideBar from '../../Components/SideBar/SideBar'

function KanbanBoardPage() {
  return (
    <div>
        <Header/>
        <SideBar/>
        <Board/>
    </div>
  )
}

export default KanbanBoardPage