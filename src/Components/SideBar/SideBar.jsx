import React, { useContext, useEffect, useState } from "react";
import "../SideBar/SideBarScript";
import "../SideBar/SideBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { UrlContext } from "../../store/urlContext";
import { jwtDecode } from "jwt-decode";

function SideBar({isOpen ,setOpen}) {
  const [role, setRole] = useState("")
    useEffect(() => {
      const accessToken = localStorage.getItem('accessToken');
        if(accessToken){
            const decode = jwtDecode(accessToken)
            const userRole = decode.role;
            console.log(userRole)
            setRole(userRole);
        }
    },[])
    const currentURL = useContext(UrlContext);
    console.log(currentURL + '---------------------------------------------------url')
    const [isSidebarOpen, setIsSidebarOpen] = useState(isOpen);
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
      className={`sidebar  ${isOpen ? "open" : "hidden"}`}
      onMouseEnter={() => setIsSidebarOpen(true)}
      onMouseLeave={() => setIsSidebarOpen(false)}
    >
      <ul class="nav-list">
        {role === "ROLE_MEMBER" ? (
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
              <a onClick={()=>{
                setOpen(false);
                navigate('/profile-settings')}}>
                <i className="bx bx-user btnx"></i>
                <span class="link_name">
                  profile
                </span>
              </a>
              <span class="tooltip">profile</span>
            </li>
            <li>
              <a onClick={()=>{
                setOpen(false);
                navigate('/notification')}}>
                <i class="bx bx-bell btnx " ></i>
                <span class="link_name">notifications</span>
              </a>
              <span class="tooltip">notificationsv</span>
            </li>
            <li>
              <a onClick={()=>{
                setOpen(false);
                navigate('/work-life-cycle')}}>
                <i class="bx bxs-file-doc btnx"></i>
                <span class="link_name">Work life cycles</span>
              </a>
              <span class="tooltip">work life cycle</span>
            </li>
            <li>
              <a  onClick={()=>{
                setOpen(false);
                navigate('/privacy-settings')}}>
                <i class="bx bxs-lock-alt btnx "></i>
                <span class="link_name ">Privacy</span>
              </a>
              <span class="tooltip">Privacy</span>
            </li>
            <li>
              <a  onClick={()=>{
                setOpen(false);
                navigate('/community')}}>
                <i class="bx bxs-chat btnx "></i>
                <span class="link_name ">Chat</span>
              </a>
              <span class="tooltip">Chat</span>
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
              <a onClick={()=>{
                setOpen(false);
                navigate('/profile-settings')}}>
                <i className="bx bx-user btnx"></i>
                <span class="link_name">
                  My profile
                </span>
              </a>
              <span class="tooltip">my profile</span>
            </li>
            <li>
              <a onClick={() =>{
                setOpen(false);
                navigate("/admin/users")}}>
                
                <i class="bx bxs-group btnx" onClick={toggleSideBar}></i>
                <span class="link_name">users</span>
              </a>
              <span class="tooltip">users</span>
            </li>
            <li>
              <a  onClick={() => {
                setOpen(false);
                navigate("/admin/projects")}}>
                <i class="bx bxs-file btnx " onClick={toggleSideBar}></i>
                <span class="link_name">projects</span>
              </a>
              <span class="tooltip">projects</span>
            </li>
            <li>
              <a  onClick={()=>{navigate('/community')}}>
                <i class="bx bxs-chat btnx "></i>
                <span class="link_name ">Chat</span>
              </a>
              <span class="tooltip">Chat</span>
            </li>
          </>
        )}
      </ul>
    </div>
  </div>
  )
}

export default SideBar