import { Add, Edit, ListAlt } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import InviteMemberModal from "./members/InviteMemberModal";
import { getProjectDetailsByProjectId } from "../../Api/project";
import { useParams } from "react-router-dom";
import Loader from "../../common/Loader";

function ViewSingleProject() {

const [projectDetails , setProjectDetails] = useState({})
const baseUrl = 'http://localhost:8083'
const [imageUrl,setImageUrl] = useState(null);
const [isLoading ,setIsLoading] = useState(false);
const {id} = useParams()
useEffect(()=>{
  console.log(id ,'from here')
  const fetchProjectDetails = async()=>{
  try {
    setIsLoading(true);
    const response = await getProjectDetailsByProjectId(id);
    setIsLoading(false)
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
      {isLoading ?
    <Loader/>
    :
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
     <InviteMemberModal projectId={projectDetails.projectId} onOpen={() => setOpen(true)} />
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
       <div key={member.id} className="flex flex-row gap-5 items-center py-2">
         <div>
           <img src={`http://localhost:8081${member.profile_image_url}`} alt={'img'} className="profile"/>
         </div>
         <div className="flex row-12 d-flex justify-content-between items-center">
           {/* <p className="col">{member.fullName}</p> */}
           <p className="col">{member.email}</p>
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
    }      
    </>
  );
}

export default ViewSingleProject;
