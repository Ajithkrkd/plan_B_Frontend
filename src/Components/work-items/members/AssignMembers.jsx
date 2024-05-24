import React, { useEffect, useState } from "react";
import { FormControl, MenuItem, Select as MuiSelect, useMediaQuery, useTheme } from "@mui/material";
import Avatar from "@mui/joy/Avatar";
import { getProjectDetailsByProjectId } from "../../../Api/project";
import { assignProjectMemberToWorkItem, unAssignMemberFromWorkItem } from "../../../Api/member";
import { getWorkItemById } from "../../../Api/workItem";
import toast from "react-hot-toast";
import Loader from "../../../common/Loader";

const AssignMembers = ({ workItemDetails }) => {
  const { workItemId, projectId } = workItemDetails;
  const [assignedMembersList, setAssignedMembersList] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getProject(projectId);
    getWorkItemByIdForDisplay(workItemId);
  }, []);

  const getWorkItemByIdForDisplay = async (workItemId) => {
    try {
      const response = await getWorkItemById(workItemId);
      const mem = response.data.memberAssigned;
      setSelectedMember(mem ? mem.userId : "unAssigned"); // Set selected member or "unAssigned" if not assigned
    } catch (error) {
      console.log(error);
    }
  };

  const getProject = async (projectId) => {
    try {
      const response = await getProjectDetailsByProjectId(projectId);
      const projectMembers = response.data.assignedMembersDetailsList.map((member) => ({
        id: member.id,
        fullName: member.fullName,
        email: member.email,
        profile_image_url: member.profile_image_url,
      }));
      setAssignedMembersList(projectMembers);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (event) => {
    const memberId = event.target.value;
    setSelectedMember(memberId);

    if (memberId === "unAssigned") {
      await unAssignMemberFromWorkItem(workItemId, projectId);
    } else {
      await assignMemberToWorkItem(memberId, workItemId, projectId);
    }
  };

  const assignMemberToWorkItem = async (memberId, workItemId, projectId) => {
    try {
      setLoading(true)
      const response = await assignProjectMemberToWorkItem(workItemId, memberId, projectId);
      console.log(response);
      toast.success("member assigned succesfully");
    } catch (error) {
      toast.error(error.response.data.message)
      if(error.response.data.message === "only admin can Assign members"){
        setSelectedMember("unAssigned")
      }
      console.log(error);
    }finally{
      
      setLoading(false);
    }
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return (
    <FormControl>
      {isLoading && <Loader/>}
      <MuiSelect
        labelId="state-select-label"
        id="state-select"
        placeholder="select member"
        value={selectedMember}
        onChange={handleChange}
        sx={{
          width: isMobile ? '100%' : isTablet ? 300 : 300,
          height: 60
        }}
        
      >
        <MenuItem value="unAssigned" key="unAssigned">
        <div className="flex items-center">
        <Avatar alt="Uemy Sharp"/>
          Unassigned
        </div>
        </MenuItem>
        {assignedMembersList.map((member) => (
          <MenuItem value={member.id} key={member.id} disabled={member.id === selectedMember}>
            <div className="flex items-center">
              <Avatar alt="Remy Sharp" src={`${member.profile_image_url}`} />
              <div className="ml-4 pl-2">
                <p className="font-semibold italic">{member.fullName}</p>
                <p className="italic">{member.email}</p>
              </div>
            </div>
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

export default AssignMembers;
