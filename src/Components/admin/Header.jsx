import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from '../../Api/User';
import Loader from '../../common/Loader';
import Logo from "../../assets/avatar.png";
const Header = () => {
  const navigate = useNavigate();
  const [profilePic ,setProfilePic] = useState(null);
  const [loading,setLoading] = useState(false);
    // useEffect(()=>{
    //   const token = localStorage.getItem('accessToken');
    //   if(token){
    //     fetchUserDetails();
    //   }
    // },[])

    const fetchUserDetails = async() =>{
      try {
        setLoading(true);
        const response = await getUserDetails();
        console.log(response.data.profile_image_path ,'profile Image path');
        if(response.data.profile_image_path === null){
          setProfilePic(Logo)
        }else{
          
          setProfilePic(response.data.profile_image_path)
        }
      } catch (error) {
        console.log(error)
      }finally{
        setLoading(false);
      }
    }
    const imgUrl = `${profilePic}`;
  return (
    <div>
      {loading && <Loader/>}
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      ></link>
      <div className=" d-flex header">
        <div className="col d-flex align-items-center ">
          {/* <i className="bx bx-menu btnx" style={{ fontSize: "27px" }}></i> */}
          <img
            src="/src/assets/workers.jpg"
            className="keep-img"
            rel="logo"
          />
          <h5 className="keep-text" onClick={()=>{navigate('/')}}>PLAN-B</h5>
        </div>
        <div className="d-flex align-items-center   ">
          <i className="bx bx-cog mx-2"></i>
          {profilePic
           ? 
           <>
          <img className="profile"
          src={profilePic ? imgUrl : '/src/assets/workers.jpg'}
          onClick={()=>navigate('/profile-settings')}
          />
          </>
          :
          <>
          <button className="btn btn-outline-dark " onClick={()=>{navigate('/register')}}>Join as a professional</button>
          </>
          }
        </div>
      </div>
    </div>
  )
}

export default Header