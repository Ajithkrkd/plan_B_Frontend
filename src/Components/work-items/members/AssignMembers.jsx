import React, { useEffect, useState } from "react";
import { FormControl, MenuItem, Select as MuiSelect } from "@mui/material";
import Avatar from "@mui/joy/Avatar";
import { getProjectDetailsByProjectId } from "../../../Api/project";
import { assignProjectMemberToWorkItem } from "../../../Api/invitation";
import { getWorkItemById } from "../../../Api/workItem";

const AssignMembers = ({ workItemDetails }) => {
  const { workItemId, projectId} = workItemDetails;
  const [assignedMembersList, setAssignedMembersList] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    console.log(projectId, workItemId, "here",selectedMember);
    getProject(projectId);
    getWorkItemByIdForDistplay(workItemId);

    setSelectedMember(workItemDetails.memberAssigned)
  }, []);

  const getWorkItemByIdForDistplay = async (projectId) => {
    try {
      const response = await getWorkItemById(projectId);
      const mem = response.data.memberAssigned;
      setSelectedMember(mem.userId);
      console.log(selectedMember);
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
      console.log(assignedMembersList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    const memberId = event.target.value;
    setSelectedMember(memberId);
    assignMemberToWorkItem(memberId, workItemId);
  };

  const assignMemberToWorkItem = async (memberId, workItemId) => {
    console.log(memberId, workItemId);
    try {
      const response = await assignProjectMemberToWorkItem(workItemId, memberId);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormControl>
      <MuiSelect
        // ... other props
        labelId="state-select-label"
        id="state-select"
        placeholder="select member"
        value={selectedMember}
        onChange={handleChange}
        sx={{ width: 300, height:57, transition: "0.2s" }}
      >
        {selectedMember ? (
          <MenuItem value={selectedMember} key={selectedMember}>
            <div className="flex items-center"> {/* Added flexbox for alignment */}
              <Avatar
                alt="Remy Sharp"
                src={`${assignedMembersList.find(
                  (m) => m.id === selectedMember
                )?.profile_image_url}`}
              />
              <div className="ml-4 pl-2 font-semibold"> {/* Adjusted styles for spacing */}
                {assignedMembersList.find((m) => m.id === selectedMember)?.fullName}
              </div>
            </div>
          </MenuItem>
        ) : (
          <MenuItem value="" key="placeholder">
            <div className="flex items-center"> {/* Added flexbox for alignment */}
              <Avatar
                alt="Remy Sharp"
                src={'/src/assets/workers.jpg'}
              />
              <div className="ml-4 pl-2 font-semibold"> {/* Adjusted styles for spacing */}
                Unassigned
              </div>
            </div>
          </MenuItem>
        )}
        {assignedMembersList.map((member) => (
          <MenuItem value={member.id} key={member.id} disabled={member.id === selectedMember}>
            <div className="flex items-center"> {/* Added flexbox for alignment */}
              <Avatar
                alt="Remy Sharp"
                src={`${member.profile_image_url}`}
              />
              <div className="ml-4 pl-2 "> {/* Adjusted styles for spacing */}
                <p className="font-semibold italic">   {member.fullName}</p>
                <p className="italic">   {member.email}</p>
              </div>
             
            </div>
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

export default AssignMembers;
