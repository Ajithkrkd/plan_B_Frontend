import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../SideBar/SideBarScript";
import "../SideBar/SideBar.css";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { getUserDetails } from "../../Api/User";
import Loader from "../../common/Loader";
import Logo from "/planb-icon.png";
import Avatar from "../../assets/person.svg"
import SideBar from "../SideBar/SideBar";
function Header() {

  
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [profilePic ,setProfilePic] = useState(null);
  const [loading,setLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(null);
    useEffect(()=>{
      const token = localStorage.getItem('accessToken');
      if(token){
        setShowProfile(true);
        fetchUserDetails();
      }
    },[])

    const fetchUserDetails = async() =>{
      try {
        setLoading(true);
        const response = await getUserDetails();
        console.log(response.data , 'details');   
          setProfilePic(response.data.profile_image_path)
       
      } catch (error) {
        console.log(error)
      }finally{
        setLoading(false);
      }
    }
  return (
    <>
    <div className="relative">
      {loading && <Loader/>}
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
        ></link>
      <div className=" d-flex items-center header">

            <p
            className='md:hidden w-[28px] h-[28px] object-contain  justify-center flex px-4'
            onClick={() => setToggle(!toggle)}
            >{toggle ? <i className="bx bx-x text-[38px]" /> : <i className="bx bx-menu text-[38px]"/>}
            </p>

        <div className="col d-flex align-items-center ">
          {/* <i className="bx bx-menu btnx" style={{ fontSize: "27px" }}></i> */}
          <img
            src={Logo}
            className="keep-img"
            rel="logo"
          />
          <h5 className=" font-semibold text-xl text-gray-500" 
          onClick={()=>{navigate('/')}} style={{cursor:'pointer'}}>PLAN-B</h5>
        </div>
          <ul className='list-none hidden sm:flex flex-row gap-10 mr-3 '>
            <Link to={"/projects"}>
              <li className="">
                <i className="bx bxs-note p-0 btn text-gray-400 text-[20px]"/>
                projects
              </li>
            </Link>   
            <Link to={"/notification"}>
              <li className="">
                <i className="bx bxs-bell p-0 btn text-gray-400 text-[20px]"/>
                notification
              </li>
            </Link>
            <Link to={"/work-life-cycle"}>
              <li className="">
                <i className="bx bx-user p-0 btn text-gray-400 text-[20px]"/>
                Work-Cycle
              </li>
            </Link>
            <Link to={"/community"}>
              <li className="">
                <i className="bx bxs-chat p-0 btn text-gray-400 text-[20px]"/>
                chat
              </li>
            </Link>
            <Link to={"/privacy-settings"}>
              <li className="">
                <i className="bx bxs-lock p-0 btn text-gray-400 text-[20px]"/>
                privacy
              </li>
            </Link>
            <Link to={"/profile-settings"}>
              <li className="">
                <i className="bx bx-user p-0 btn text-gray-400 text-[20px]"/>
                profile
              </li>
            </Link>
            
          </ul>
        <div className="sm:flex ">
     
          {showProfile
           ? 
           <>
          <img className="profile"
          src={profilePic != null ? profilePic : Avatar}
          onClick={()=>navigate('/profile-settings')}
          />
          </>
          :
          <>
          <button className="btn btn-outline-dark " 
          onClick={()=>{navigate('/register')}}>login</button>
          </>
          }
        </div>
        
      </div>
          
    </div>
    <SideBar isOpen={toggle} setOpen={setToggle}/>
    </>
  );
}

export default Header;
