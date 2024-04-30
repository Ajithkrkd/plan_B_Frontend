import React, { useEffect, useState } from "react";
import "../../Components/Project/project.css";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { getAllInvitation } from "../../Api/member";
import NotificationModal from "./NotificationModal";
import './notification.css'
const Notification = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    const fetchInvitationDetails = async () => {
      try {
        const response = await getAllInvitation();
        const sortedInvitations = response.data.sort((a, b) => new Date(b.invitation_sent_time) - new Date(a.invitation_sent_time));
        setInvitations(response.data);
        console.log(sortedInvitations);
      } catch (error) {
        console.error("Error fetching invitations:", error);
      }
    };
    fetchInvitationDetails();
    console.log(token);
  }, []);


  
  const getTimeDifference = (timestamp) => {
    const currentTime = new Date();
    const messageTime = new Date(timestamp);
    const differenceInMilliseconds = currentTime - messageTime;
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    const differenceInHours = Math.floor(differenceInMinutes / 60);

    if (differenceInHours > 0) {
      return `${differenceInHours} ${
        differenceInHours === 1 ? "hour" : "hours"
      } ago`;
    } else if (differenceInMinutes > 0) {
      return `${differenceInMinutes} ${
        differenceInMinutes === 1 ? "minute" : "minutes"
      } ago`;
    } else {
      return "Just now";
    }
  };

  return (
    <div className="project-container">
      <p className="font-semibold text-2xl underline my-3">Notifications</p>
      {invitations.length > 0 ? (
        invitations.map((inv) => (
          <div className={`notification-container border m-2 p-2 ${inv.invitation_status === 'ACCEPTED' ? 'notification-accepted' : ''}`} key={inv.id}>
            <div className="notification-content ">
              <img
                src={inv.project_image_url}
                style={{ width: 100, boxShadow: "none" }}
                alt="Project"
              />
              <div className="notification-details">
                 <div className="border flex justify-between p-2 ">
                    <span
                      className="px-4 py-1"
                      style={{ backgroundColor: "#4B84BE", color: "#FFF" }}
                    >
                      FROM
                    </span>
                    <span className="font-semibold text-lg italic">{inv.invitation_from} </span>
                  </div>
                  <div className="border flex justify-between p-2 ">
                    <span
                      className="px-4 py-1"
                      style={{ backgroundColor: "#4B84BE", color: "#FFF" ,marginRight:"5px"}}
                    >
                      Message
                    </span>
                    <span className="font-semibold text-lg italic">{inv.invitation_message} </span>
                  </div>
                  <div className="border flex justify-between p-2 ">
                    <span
                      className="px-4 py-1"
                      style={{ backgroundColor: "#4B84BE", color: "#FFF" }}
                    >
                     Project Name
                    </span>
                    <span className="font-semibold text-lg italic"> {inv.project_title} </span>
                  </div>
               
                    <span className=" text-sm italic"> {getTimeDifference(inv.invitation_sent_time)} </span>
              </div>
            </div>
            <div className="notification-actions">
              {inv.invitation_status === "ACCEPTED" ? (
                <Button disabled variant="contained">
                  Accepted
                </Button>
              ) : (
                <NotificationModal notification={inv} />
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No Notifications</p>
      )}
    </div>
  );
};

export default Notification;
