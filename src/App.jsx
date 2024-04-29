import React from 'react'
import './App.css'
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import HomePage from './Pages/HomePage'
import UserRoutes from './Components/PrivateRoutes/UserRoutes'
import UserProfilePage from './Pages/UserProfilePage'
import PrivacyDetailsPage from './Pages/PrivacyDetailsPage'
import ForgotPasswordPage from './Pages/ForgotPasswordPage'
import EditProfilePage from './Pages/EditProfilePage'
import ViewSingleProjectPage from './Pages/projects/ViewSingleProjectPage'
import AllProjectsPage from './Pages/projects/AllProjectsPage'
import NotificationPage from './Pages/notification/NotificationPage'
import AllWorkItemsPage from './Pages/work-item/AllWorkItemsPage'
import KanbanBoardPage from './Pages/board/KanbanBoardPage'
import WorkLifeCyclePage from './Pages/work-item/WorkLifeCyclePage'
import CommunityPage from './Pages/Community/CommunityPage'
import NotFount from './Pages/errorPage/NotFount'
import AdminRoutes from './Components/PrivateRoutes/AdminRoutes'
import AdminManagment from './Components/admin/AdminManagment'
import AdminUsers from './Components/admin/users/AdminUsers'
import AdminProjects from './Components/admin/projects/AdminProjects'



function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' Component={HomePage}/>
          <Route path='/login' Component={LoginPage}/>
          <Route path='/register' Component={RegisterPage}/>
            <Route path='/forgotten-password' Component={ForgotPasswordPage}/>
            <Route path='/project/:id' Component={ViewSingleProjectPage}/>
            <Route path='/error' Component={NotFount}/>

          <Route element={<UserRoutes/>}>
            <Route path='/community' Component={CommunityPage}/>
            <Route path='/projects' Component={AllProjectsPage}/>
            <Route path='/profile-settings' Component={UserProfilePage}/>
            <Route path='/privacy-settings' Component={PrivacyDetailsPage}/>
            <Route path='/editProfile' Component={EditProfilePage}/>
            <Route path='/notification' Component={NotificationPage}/>
            <Route path='/project/:projectId/work-items' Component={AllWorkItemsPage}/>
            <Route path='/board/:id' Component={KanbanBoardPage}/>
            <Route path='/work-life-cycle' Component={WorkLifeCyclePage}/>
          </Route>
          <Route element={<AdminRoutes/>}>
          <Route path='/admin' Component={AdminManagment}/>
          <Route path='/admin/users' Component={AdminUsers}/>
          <Route path='/admin/projects' Component={AdminProjects}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
