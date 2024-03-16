import { Add, Edit, ListAlt } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import InviteMemberModal from "./members/InviteMemberModal";
import { getProjectDetailsByProjectId } from "../../Api/project";
import { useParams } from "react-router-dom";

function ViewSingleProject() {

const [projectDetails , setProjectDetails] = useState({})
const baseUrl = 'http://localhost:8083'
const [imageUrl,setImageUrl] = useState(null);
const {id} = useParams()
useEffect(()=>{
  console.log(id ,'from here')
  const fetchProjectDetails = async()=>{
  try {
    
    const response = await getProjectDetailsByProjectId(id);
    console.log(response.data)
    setProjectDetails(response.data);
    if(response.data.project_profile_url != null){
      setImageUrl(baseUrl+response.data.project_profile_url);
    }

  } catch (error) {
    console.log(error)
  }
}
fetchProjectDetails(id);
},[id])







  return (
    <>

      <div className="project-container">
      
           <div className="flex flex-row items-center justify-between pr-3  py-2">
          <div className="flex flex-wrap items-center">
            <img
              src={imageUrl ? imageUrl : `/src/assets/workers.jpg`}
              className=""
              style={{ width: 100, height: 70, border: 1 }}
            />
            <p className="text-3xl font-bold ">{projectDetails.title}</p>
          </div>
          <div className=" flex items-end">
           <InviteMemberModal/>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between pr-3 border px-5   py-3">
          <div>
            <p className="text-2xl py-2 font-semibold">About the Project</p>
            <p className="opacity-12">
              {projectDetails.description} 
            </p>
          </div>
          <div className=" flex items-end">
            <Button variant="outlined">
              <Edit /> 
            </Button>
          </div>
        </div>
  
        <div className="flex flex-row items-center justify-between pr-3 border px-5 py-3">
          <div>
            <p className="text-2xl py-2 font-semibold">Project Stats</p>
            <div className="flex flex-row justify-between items-center space-x-4">
              <div>
                <ListAlt />
                <span className="px-2 text-gray"><b>0</b> Total Work item</span>
              </div>
              <div>
                <ListAlt />
                <span className="px-2 text-gray"><b>0</b> Total Work item</span>
              </div>
            </div>
          </div>
            <div className=" flex items-end">
            <Button variant="outlined">
              <Edit /> 
            </Button>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between pr-3 border px-5 py-3">
          <div>
            <p className="text-2xl py-2 font-semibold">Members</p>
            {projectDetails.assignedMembersDetailsList && projectDetails.assignedMembersDetailsList.map(member => (
            <div key={member.id} className="flex flex-row justify-between items-center space-x-4">
              <div>
                <img src={`http://localhost:8081${member.profile_image_url}`} alt={member.fullName} className="profile"/>
              </div>
              <div>
                <span className="px-2 text-gray">{member.fullName}</span>
              </div>
            </div>
          ))}
          </div>
            {/* <div className=" flex items-end">
            <Button variant="outlined">
              <Edit /> 
            </Button>
          </div> */}
        </div>
        
      </div>
      
    </>
  );
}

export default ViewSingleProject;
