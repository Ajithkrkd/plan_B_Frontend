import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../SideBar/SideBarScript";
import "../SideBar/SideBar.css";
import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header() {


  const navigate = useNavigate();



  return (
    <div>
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
            rel="keep logo"
          />
          <h5 className="keep-text" onClick={()=>{navigate('/')}}>Plan-B</h5>
        </div>
        <div className="d-flex align-items-center   ">
          <i className="bx bx-cog mx-2"></i>
          <button className="btn btn-outline-dark " onClick={()=>{navigate('/register')}}>Join as a professional</button>
          
        </div>
      </div>
    </div>
  );
}

export default Header;
