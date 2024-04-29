import React, { useState } from "react";
import "../project.css";
import { AdminPanelSettings, Delete } from "@mui/icons-material";
import { Alert, Box, Button, Modal, Tooltip } from "@mui/material";
import toast from "react-hot-toast";
import { removeMemberFromProject } from "../../../Api/invitation";
import Loader from "../../../common/Loader";
const  AssignedMembers =({ assignedMembers, projectAdmins, projectId,rootAdmin })=> {

  const [isLoading, setIsLoading] = useState(false);
  const [memberToRemove,setMemberToRemove]= useState(null);
  const [open, setOpen] = useState(false);
  const [assignedMembersList ,setAssignedMembersList] = useState(assignedMembers);

  const handleRemoveMember = async (memberId) => {
    if(!projectId  || !memberId){
      toast.error("Something went wrong try later");
    }
   setMemberToRemove(memberId);
   setOpen(true);

  };

  const handleCancel = () => {
    setOpen(false);
    setMemberToRemove(null);
  };

  const handleConfirm = async() => {
    try {
      setIsLoading(true);
      const response = await removeMemberFromProject(projectId, memberToRemove);
      console.log(response);
      setAssignedMembersList(assignedMembersList.filter(member => member.id !== memberToRemove));
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
    }finally{
      setIsLoading(false);
      console.log("Remove member with ID:", memberToRemove , projectId);
      setOpen(false);
      setMemberToRemove(null);
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 600,
    bgcolor: 'background.paper',
    outLine: "none",
    boxShadow: 224,
    p: 4,
  };
  

  return (
    <>
    {isLoading && <Loader/>}
      <div className="flex flex-col  justify-between pr-3 border px-5 py-3">
        <p className="text-2xl py-2 font-semibold">Project Administrators</p>
        {projectAdmins &&
          projectAdmins.map((member) => (
            <div key={member.id} className="flex  items-center py-2">
              <div className="flex items-start mr-5">
                <img
                  src={`${member.profile_image_url}`}
                  alt={"img"}
                  className="profile"
                />
              </div>
              <div style={{ minWidth: 700 }} className="flex justify-between">
                <div className=" items-end flex justify-between border gap-5">
                  <span
                    className="px-1 py-1"
                    style={{ backgroundColor: "#4B84BE", color: "#FFF" }}
                  >
                    name{" "}
                  </span>
                  <span
                    className="col text-lg italic"
                    style={{
                      minWidth: 180,
                    }}
                  >
                    {member.fullName}
                  </span>
                </div>
                <div className=" items-end flex justify-between border gap-5">
                  <span
                    className="px-1 py-1"
                    style={{ backgroundColor: "#4B84BE", color: "#FFF" }}
                  >
                    email{" "}
                  </span>
                  <span
                    className="col text-lg italic"
                    style={{
                      minWidth: 180,
                    }}
                  >
                    {member.email}
                  </span>
                </div>
              </div>
                    {
                      member.email === rootAdmin ?
                      <Tooltip title=" Created Admin" arrow>
                      <AdminPanelSettings
                      color="success"
                        style={{ float: "right", fontSize: 35, cursor: "pointer" }}
                        className="remove-button"
                      />
                      </Tooltip>
                    :
                      <Tooltip title="Remove admin" arrow>
                      <Delete
                        color="error"
                        style={{ float: "right", fontSize: 35, cursor: "pointer" }}
                        onClick={() => handleRemoveMember(member.id)}
                        className="remove-button"
                      />
                    </Tooltip>
                   
                    }
            </div>
          ))}
      </div>
      <div className="flex flex-col  justify-between pr-3 border px-5 py-3">
        <p className="text-2xl py-2 font-semibold">Members</p>
        {assignedMembersList &&
          assignedMembersList.map((member) => (
            <div key={member.id} className="flex  items-center py-2">
              <div className="flex items-start mr-5">
                <img
                  src={`${member.profile_image_url}`}
                  alt={"img"}
                  className="profile"
                />
              </div>
              <div style={{ minWidth: 700 }} className="flex justify-between">
                <div className=" items-end flex justify-between border gap-5" >
                  <span
                    className="px-1 py-1"
                    style={{ backgroundColor: "#4B84BE", color: "#FFF" }}
                  >
                    name{" "}
                  </span>
                  <span
                    className="col text-lg italic"
                    style={{
                      minWidth: 180,
                    }}
                  >
                    {member.fullName}
                  </span>
                </div>
                <div className=" items-end flex justify-between border gap-5">
                  <span
                    className="px-1 py-1"
                    style={{ backgroundColor: "#4B84BE", color: "#FFF" }}
                  >
                    email{" "}
                  </span>
                  <span
                    className="col text-lg italic"
                    style={{
                      minWidth: 180,
                    }}
                  >
                    {member.email}
                  </span>
                </div>
              </div>
              <Tooltip title="Remove member" arrow>
                <Delete
                  color="error"
                  style={{ float: "right", fontSize: 35, cursor: "pointer" }}
                  onClick={() => handleRemoveMember(member.id)}
                  className="remove-button"
                />
              </Tooltip>
            </div>
          ))}
      </div>
      <Modal open={open} onClose={handleCancel}>
        <Box sx={{ ...style, width: 200 ,outline: "none" }}> 
          <div>
            <p className="text-xl my-1 py-2" id="modal-title">Do you want to remove this member from your project?</p>
            <Alert  severity="info">The member is also un assigned from all related workItems</Alert>
           <div style={{float:"right", marginTop:"10px"}}>
              <Button variant="outlined" color="error"   className="mx-2" onClick={handleCancel}>Cancel</Button>
              <Button variant="outlined" color="success" className="mx-2" onClick={handleConfirm}>Confirm</Button>
           </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default AssignedMembers;
