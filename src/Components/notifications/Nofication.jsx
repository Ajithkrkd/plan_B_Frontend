import React, { useEffect, useState } from "react";
import "../../Components/Project/project.css";
import { useLocation, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { getAllInvitation } from "../../Api/invitation";
import NotificationModal from "./NotificationModal";
const Nofication = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const [invitations, setInvitations] = useState([]);
  //TODO : dynamic project image url
  const imgUrl = `http://localhost:8081/uploads/candile1.jpg`;

  useEffect(() => {
    const fetchInvitationDetails = async () => {
      const response = await getAllInvitation();
      setInvitations(response.data);
      console.log(response.data);
    };
    fetchInvitationDetails();
    console.log(token);
  }, []);

  return (
    <div className="project-container">
      <p className="font-semibold text-2xl underline my-3">Notifications</p>
      {invitations ? (
        invitations.map((inv) => (
          <>
            <div className="flex flex-wrap border p-3 mr-4 gap-10 shadow rounded">
              <img
                src={imgUrl}
                style={{ width: 50, shadow: "none" }}
                alt="Project"
              />
              <div className="mx-2 flex flex-col">
                <p>Invitation from</p>
                <p className="font-bold">{inv.invitation_from}</p>
              </div>
              <div className="mx-2 flex flex-col">
                <p>Message</p>
                <p className="font-thin">{inv.invitation_message}</p>
              </div>
              <div className="mx-2 flex flex-col">
                <p>Project</p>
                <p className="font-thin">{inv.project_title}</p>
              </div>
              <div className="mx-2 flex flex-col">
                <NotificationModal notification={inv} />
              </div>
            </div>
          </>
        ))
      ) : (
        <>No Notifications</>
      )}
    </div>
  );
};

export default Nofication;
