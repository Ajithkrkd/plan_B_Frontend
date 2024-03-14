import React, { useContext, useEffect, useState } from "react";
import "../SideBar/SideBarScript";
import "../SideBar/SideBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { UrlContext } from "../../store/urlContext";



function SideBar() {

    const currentURL = useContext(UrlContext);
    console.log(currentURL + '---------------------------------------------------url')
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [userData , setUsreData] = useState(null);
    useEffect(()=>{
      const storedUserDetails = localStorage.getItem("userData");
      const UserDetails = JSON.parse(storedUserDetails);
      setUsreData(UserDetails)

    },[])
    
  
    const toggleSideBar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");


  return (
    <div>
    <link
      href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
      rel="stylesheet"
    ></link>
    <div
      className={`sidebar ${isSidebarOpen ? "open" : ""}`}
      onMouseEnter={() => setIsSidebarOpen(true)}
      onMouseLeave={() => setIsSidebarOpen(false)}
    >
      <ul class="nav-list">
        {currentURL == '/profile-settings' || '/privacy-settings' ? (
          <>
          <li>
              <a onClick={()=>{navigate('/projects')}}>
                <i className="bx bxs-note btnx"></i>
                <span class="link_name">
                    projects
                </span>
              </a>
              <span class="tooltip">projects</span>
            </li>
            <li>
              <a onClick={()=>{navigate('/profile-settings')}}>
                <i className="bx bx-user btnx"></i>
                <span class="link_name">
                  profile
                </span>
              </a>
              <span class="tooltip">profile</span>
            </li>
            <li>
              <a>
                <i class="bx bx-bell btnx " onClick={toggleSideBar}></i>
                <span class="link_name">notifications</span>
              </a>
              <span class="tooltip">notificationsv</span>
            </li>
            <li>
              <a >
                <i class="bx bxs-file-doc btnx"></i>
                <span class="link_name">My work items</span>
              </a>
              <span class="tooltip">My work items</span>
            </li>
            <li>
              <a  onClick={()=>{navigate('/privacy-settings')}}>
                <i class="bx bxs-lock-alt btnx "></i>
                <span class="link_name ">Privacy</span>
              </a>
              <span class="tooltip">Privacy</span>
            </li>
            {/* <li>
              <a href="" onClick={()=>navigate("/bin")}>
                <i class="bx bx-trash btnx"></i>
                <span class="link_name">Bin</span>
              </a>
              <span class="tooltip">Bin</span>
            </li> */}
          </>
        ) : (
          <>
            <li>
              <a  onClick={() => navigate("/register")}>
                <i className="bx bx-notepad btnx"></i>
                <span class="link_name">Register</span>
              </a>
              <span class="tooltip">Register</span>
            </li>
            <li>
              <a onClick={() => navigate("/login")}>
                <i class="bx bxs-notepad btnx " onClick={toggleSideBar}></i>
                <span class="link_name">Login</span>
              </a>
              <span class="tooltip">Login</span>
            </li>
            <li>
              <a  onClick={() => navigate("/")}>
                <i class="bx bx-edit-alt btnx " onClick={toggleSideBar}></i>
                <span class="link_name">forgotten password</span>
              </a>
              <span class="tooltip">Forgotten password</span>
            </li>
          </>
        )}
      </ul>
    </div>
  </div>
  )
}

export default SideBar