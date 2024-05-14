import React, { useState } from "react";
import profileBG from "/src/assets/fBG.png";
import { CalendarMonth, Email, PhoneAndroid } from "@mui/icons-material";
import { Button } from "@mui/material";
import { formateJoiningDateTime } from "./userUtils";
import { useNavigate } from "react-router-dom";
import Loader from "../../common/Loader";
import ProfileExample from "../../assets/workers.jpg";
function ProfileHead({ userDetails }) {
  const divStyle = {
    backgroundImage: profileBG
      ? `url(${profileBG})`
      : "url('https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_640.png')",

    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const [userData , setUserData] = useState({
      userId: userDetails.userId,
      fullName: userDetails.fullName,
      phoneNumber: userDetails.phoneNumber,
      email: userDetails.email,
      profile_image_path: userDetails.profile_image_path,
      joinDate: userDetails.joinDate,
      isEmailVerified: userDetails.isEmailVerified,
      isBlocked: userDetails.isBlocked,
      role: userDetails.role,
    
  })

  const formatedDate = formateJoiningDateTime(userData.joinDate);

  const navigate = useNavigate()
 const handleLogout = () => {
  try {
    localStorage.clear();
    navigate("/login");
  } catch (error) {
    console.log(error)
  }
 }
  return (
    <div className="profile-container">
      {userData === '' && <Loader/>}
      <div style={divStyle} className="h-52 relative">
        <div className="absolute inset-0 bg-black opacity-0"></div>
      </div>
      <div className="px-5 md:px-14 xl:px-28 mt-[-70px] z-10 relative  pb-5">
        <div className="">
          <div className="flex flex-col sm:flex-row items-center">
            <div className="border-4 sm:border-8 border-white rounded-full">
              <img
                src={
                  userData.profile_image_path
                    ? userData.profile_image_path
                    : ProfileExample
                }
                style={{width: "110px", height:100}}
                alt=""
                className="rounded-full w-28 sm:w-36"
              />
            </div>
            <div className="sm:flex  sm:justify-between sm:w-full pt-5">
              <div className="sm:mt-20 mt-4 flex flex-col justify-between items-center">
                <h1 className="sm:text-6xl text-3xl font-semibold text-center">
                  Hi, {userData.fullName}
                </h1>
                <div className="flex items-center flex-col sm:flex-row gap-2 sm:gap-10 pt-2 ">
                  <Email /> {userData.email}
                  <PhoneAndroid color="black" />{" "}
                  <b>{userData.phoneNumber}</b>
                  <CalendarMonth color="black" /> <b>Joined: {formatedDate}</b>
                </div>
              </div>
              <div className="hidden felx flex-row  sm:block clear-left mt-28">
                <Button
                  className="m-1"
                  variant="contained"
                  style={{ backgroundColor: "#EA4437" }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
                <Button
                  className="px-4"
                  variant="contained"
                  style={{ backgroundColor: "#007FFF" }}
                  onClick={()=>{navigate('/editProfile')}}
                >
                  Edit profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHead;
