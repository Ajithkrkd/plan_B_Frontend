import React, { useState } from "react";
import profileBG from "/src/assets/fBG.png";
import { CalendarMonth, Email, PhoneAndroid } from "@mui/icons-material";
import { Button } from "@mui/material";
import { formateJoiningDateTime } from "./userUtils";
import { useNavigate } from "react-router-dom";
import Loader from "../../common/Loader";
import ProfileExample from "../../assets/person.svg";
function ProfileHead({ userDetails }) {
  const divStyle = {
    backgroundImage: profileBG
      ? `url(${profileBG})`
      : "url('https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_640.png')",

    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const formatedDate = formateJoiningDateTime(userDetails.joinDate);

  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="project-container bg-[#f1f1f1] min-h-screen ">
      {userDetails === "" && <Loader />}
      <div style={divStyle} className="h-52 relative">
        <div className="absolute inset-0 bg-black opacity-0"></div>
      </div>
      <div className="px-5 md:px-14 xl:px-28 mt-[-70px] z-10 relative  pb-5">
        <div className="">
          <div className="flex flex-col sm:flex-row items-center">
            <div className="border-4 sm:border-8 border-white rounded-full">
              <img
                src={
                  userDetails.profile_image_path
                    ? userDetails.profile_image_path
                    : ProfileExample
                }
                alt="profile"
                className="object-cover rounded-full"
                style={{ width: "200px", height: "200px" }}
              />
            </div>
            <div className="md:flex md:justify-between sm:w-full pt-5 ">
              <div className="md:mt-20 mt-4 flex flex-col justify-between items-center">
                <h1 className="md:text-6xl text-3xl font-semibold mb-3">
                  Hi, {userDetails.fullName}
                </h1>

                <div className="flex gap-4 flex-col md:flex-row">
                  <div
                    className="flex items-end justify-between border mb-2 sm:mb-0"
                    
                  >
                    <span className="px-2 mr-2 py-1 bg-[#4B84BE] text-white">
                      email
                    </span>
                    <span className="text-lg italic" >
                      {userDetails.email}
                    </span>
                  </div>
                  <div
                    className="flex items-end justify-between border mb-2 sm:mb-0"
                    
                  >
                    <span className="px-1 py-1 bg-[#4B84BE] text-white">
                      Phone
                    </span>
                    <span className="text-lg italic" >
                      {userDetails.phoneNumber}
                    </span>
                  </div>
                  <div
                    className="flex items-end justify-between border mb-2 sm:mb-0"
                    
                  >
                    <span className="px-1 py-1 bg-[#4B84BE] text-white">
                      Joined
                    </span>
                    <span className="text-lg italic" >
                      {formateJoiningDateTime(userDetails.joinDate)}
                    </span>
                  </div>
                </div>
              </div>
              <div className=" felx flex-row  sm:block clear-left mt-28">
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
                  onClick={() => {
                    navigate("/editProfile");
                  }}
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
