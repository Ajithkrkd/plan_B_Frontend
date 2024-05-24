import React, { useState } from "react";
import "../project.css";
import {
  AdminPanelSettings,
  AdminPanelSettingsOutlined,
  Delete,
} from "@mui/icons-material";
import { Alert, Box, Button, Modal, Tooltip } from "@mui/material";
import toast from "react-hot-toast";
import {
  assignAdminToProject,
  removeAdminFromProject,
  removeMemberFromProject,
} from "../../../Api/member";
import Loader from "../../../common/Loader";
import ProfileAvatar from "../../../assets/maleAvatar.svg";
import ProfileAvatarAdmin from "../../../assets/greenAvatar.svg";


const AssignedMembers = ({
  assignedMembers,
  projectAdmins,
  projectId,
  rootAdmin,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(null);
  const [adminToRemove, setAdminToRemove] = useState(null);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [open, setOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [removeAdminOpen, setRemoveAdminOpen] = useState(false);
  const [assignedMembersList, setAssignedMembersList] =
    useState(assignedMembers);
  const [assignedAdminList, setAssignedAdminList] = useState(projectAdmins);

  const handleRemoveMember = async (memberId) => {
    if (!projectId || !memberId) {
      toast.error("Something went wrong try later");
    }
    setMemberToRemove(memberId);
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setMemberToRemove(null);
  };

  const handleRemoveMemberConfirm = async () => {
    try {
      if (assignedAdminList.some((admin) => admin.id === memberToRemove)) {
        toast.error("Member is project administrator, cannot remove");
        setMemberToRemove(null);
        return;
      }
      setIsLoading(true);
      const response = await removeMemberFromProject(projectId, memberToRemove);
      console.log(response);
      setAssignedMembersList(
        assignedMembersList.filter((member) => member.id !== memberToRemove)
      );
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
      console.log("Remove member with ID:", memberToRemove, projectId);
      setOpen(false);
      setMemberToRemove(null);
    }
  };
  const handleMakeAdmin = async (memberId) => {
    if (!projectId || !memberId) {
      toast.error("Something went wrong try later");
    }
    setSelectedAdmin(memberId);
    setAdminOpen(true);
  };

  const handleAdminCancel = () => {
    setAdminOpen(false);
    setSelectedAdmin(null);
  };

  const handleMakeAdminConfirm = async () => {
    try {
      if (assignedAdminList.some((admin) => admin.id === selectedAdmin)) {
        toast.error("Member is already an administrator.");
        return;
      }
      setIsLoading(true);
      const response = await assignAdminToProject(projectId, selectedAdmin);
      console.log(response);

      const newAdmin = assignedMembersList.find(
        (member) => member.id === selectedAdmin
      );
      setAssignedAdminList([...assignedAdminList, newAdmin]);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
      console.log("Remove member with ID:", memberToRemove, projectId);
      setAdminOpen(false);
      setSelectedAdmin(null);
    }
  };

  const handleRemoveAdmin = async (memberId) => {
    if (!projectId || !memberId) {
      toast.error("Something went wrong try later");
    }
    setAdminToRemove(memberId);
    setRemoveAdminOpen(true);
  };

  const handleRemoveAdminCancel = () => {
    setRemoveAdminOpen(false);
    setAdminToRemove(null);
  };
  const handleRemoveAdminConfirm = async () => {
    try {
      setIsLoading(true);
      const response = await removeAdminFromProject(projectId, adminToRemove);
      console.log(response);
      setAssignedAdminList(
        assignedAdminList.filter((admin) => admin.id !== adminToRemove)
      );
      toast.success("Admin removed from the List");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
      console.log("Remove member with ID:", memberToRemove, projectId);
      setRemoveAdminOpen(false);
      setAdminToRemove(null);
    }
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 600,
    bgcolor: "background.paper",
    outLine: "none",
    boxShadow: 224,
    p: 4,
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex flex-col justify-between pr-3 border px-5 py-3 bg-[#f1f1f1]">
        <p className="sm:text-2xl text-[18px] py-2 font-semibold">
          Project Administrators
        </p>
        {assignedAdminList &&
          assignedAdminList.map((member) => (
            <div
              key={member.id}
              className="flex flex-col sm:flex-row items-center py-2 "
            >
              <div className="flex items-start mr-5 mb-2 sm:mb-0">
                <img
                  src={`${member.profile_image_url != null ? member.profile_image_url : ProfileAvatarAdmin}`}
                  alt={"img"}
                  className="profile"
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-between w-full sm:w-auto">
                <div className="flex items-end justify-between border gap-5 mb-2 sm:mb-0">
                  <span className="px-1 py-1 bg-[#4B84BE] text-white">
                    name
                  </span>
                  <span className="text-lg italic" style={{ minWidth: 180 }}>
                    {member.fullName}
                  </span>
                </div>
                <div className="flex items-end justify-between border gap-5 mb-2 sm:mb-0">
                  <span className="px-1 py-1 bg-[#4B84BE] text-white">
                    email
                  </span>
                  <span className="text-lg italic" style={{ minWidth: 180 }}>
                    {member.email}
                  </span>
                </div>
              </div>
              <div className="flex sm:block md:mt-2 ml-5 sm:mt-0">
                {member.email === rootAdmin ? (
                  <Tooltip title=" Created Admin" arrow>
                    <AdminPanelSettings
                      color="success"
                      style={{ fontSize: 35, cursor: "pointer" }}
                      className="remove-button"
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Remove admin" arrow>
                    <Delete
                      color="error"
                      style={{ fontSize: 35, cursor: "pointer" }}
                      onClick={() => handleRemoveAdmin(member.id)}
                      className="remove-button"
                    />
                  </Tooltip>
                )}
              </div>
            </div>
          ))}
      </div>

      <div className="flex flex-col justify-between pr-3 border px-5 py-3">
        <p className="sm:text-2xl text-[18px] py-2 font-semibold">Members</p>
        {assignedMembersList &&
          assignedMembersList.map((member) => (
            <div
              key={member.id}
              className="flex flex-col sm:flex-row items-center py-2"
            >
              <div className="flex items-start mr-5 mb-2 sm:mb-0">
                <img
                  src={`${member.profile_image_url != null ? member.profile_image_url : ProfileAvatar}`}
                  alt={"img"}
                  className="profile"
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-between w-full sm:w-auto">
                <div className="flex items-end justify-between border gap-5 mb-2 sm:mb-0">
                  <span className="px-1 py-1 bg-[#4B84BE] text-white">
                    name
                  </span>
                  <span className="text-lg italic" style={{ minWidth: 180 }}>
                    {member.fullName}
                  </span>
                </div>
                <div className="flex items-end justify-between border gap-5 mb-2 sm:mb-0">
                  <span className="px-1 py-1 bg-[#4B84BE] text-white">
                    email
                  </span>
                  <span className="text-lg italic" style={{ minWidth: 180 }}>
                    {member.email}
                  </span>
                </div>
              </div>
              <div className="flex sm:block ml-5 mt-2 gap-5 sm:mt-0">
                <Tooltip title="Make Admin" arrow>
                  <AdminPanelSettingsOutlined
                    color="success"
                    style={{ fontSize: 35, cursor: "pointer" }}
                    onClick={() => handleMakeAdmin(member.id)}
                    className="remove-button"
                  />
                </Tooltip>
                <Tooltip title="Remove member" arrow>
                  <Delete
                    color="error"
                    style={{ fontSize: 35, cursor: "pointer" }}
                    onClick={() => handleRemoveMember(member.id)}
                    className="remove-button"
                  />
                </Tooltip>
              </div>
            </div>
          ))}
      </div>

      <Modal open={open} onClose={handleCancel}>
        <Box sx={{ ...style, width: 200, outline: "none" }}>
          <div>
            <p className="text-xl my-1 py-2" id="modal-title">
              Do you want to remove this member from your project?
            </p>
            <Alert severity="info">
              The member is also un assigned from all related workItems
            </Alert>
            <div style={{ float: "right", marginTop: "10px" }}>
              <Button
                variant="outlined"
                color="error"
                className="mx-2"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                color="success"
                className="mx-2"
                onClick={handleRemoveMemberConfirm}
              >
                Confirm
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      <Modal open={adminOpen} onClose={handleAdminCancel}>
        <Box sx={{ ...style, width: 200, outline: "none" }}>
          <div>
            <p className="text-xl my-1 py-2" id="modal-title">
              Do you want to Add this member To This Project Administrator List?
            </p>
            <Alert severity="info">
              The member will get all the power to manage the project
            </Alert>
            <div style={{ float: "right", marginTop: "10px" }}>
              <Button
                variant="outlined"
                color="error"
                className="mx-2"
                onClick={handleAdminCancel}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                color="success"
                className="mx-2"
                onClick={handleMakeAdminConfirm}
              >
                Confirm
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      <Modal open={removeAdminOpen} onClose={handleRemoveAdminCancel}>
        <Box sx={{ ...style, width: 200, outline: "none" }}>
          <div>
            {isLoading && <Loader />}
            <p className="text-xl my-1 py-2" id="modal-title">
              Do you want to Remove this member From This Project Administrator
              List?
            </p>
            <Alert severity="info">
              The member will Loose all the power to manage the project
            </Alert>
            <div style={{ float: "right", marginTop: "10px" }}>
              <Button
                variant="outlined"
                color="error"
                className="mx-2"
                onClick={handleRemoveAdminCancel}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                color="success"
                className="mx-2"
                onClick={handleRemoveAdminConfirm}
              >
                Confirm
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default AssignedMembers;
