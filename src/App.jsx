import React from 'react'
import './App.css'
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import HomePage from './Pages/HomePage'
import UserRoutes from './Components/PrivateRoutes/UserRoutes'
import AllProjectsPage from './Pages/AllProjectsPage'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' Component={HomePage}/>
          <Route path='/login' Component={LoginPage}/>
          <Route path='/register' Component={RegisterPage}/>

          <Route element={<UserRoutes/>}>
            <Route path='/projects' Component={AllProjectsPage}/>
          </Route>

        </Routes>
      </Router>
    </>
  )
}

export default App
