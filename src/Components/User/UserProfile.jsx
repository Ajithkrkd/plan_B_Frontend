import React, { useEffect, useState } from 'react'
import ProfileHead from './ProfileHead'
import "./user.css";
import { getUserDetails } from '../../Api/User';
import EditProfile from './EditProfile';
function UserProfile() {


  const imgUrl = `http://localhost:8081`;
  const [profilePic, setProfilePic] = useState(null);
  const [userDetails, setUserDetails] = useState({
    userId: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    profile_image_path: "",
    joinDate: "",
    isEmailVerified: "",
    isBlocked: "",
    role: "",
  });

  const fetchUserDetails = async () => {
    const userDetailsResponse = await getUserDetails();
    console.log(userDetailsResponse.data, "from here");
    const data = userDetailsResponse.data;
    setUserDetails({
      userId: data.userId,
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      profile_image_path: data.profile_image_path,
      joinDate: data.joinDate,
      isEmailVerified: data.isEmailVerified,
      isBlocked: data.isBlocked,
      role: data.role,
    });
    setFormData({
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
    });
    setProfilePic(`${imgUrl}${data.profile_image_path}`);
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      fetchUserDetails();
    }
  }, []);



  return (
    <>
    <div className=''>
      <ProfileHead userDetails={userDetails}/>
    </div>
    </>
  )
}

export default UserProfile