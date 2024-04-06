import {
  CameraAltOutlined,
  Edit,
  ListAlt,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import InviteMemberModal from "./members/InviteMemberModal";
import {
  addProfileImageForProject,
  getProjectDetailsByProjectId,
} from "../../Api/project";
import { useParams , } from "react-router-dom";
import Loader from "../../common/Loader";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function ViewSingleProject() {
  const [projectDetails, setProjectDetails] = useState({});
  const baseUrl = "http://localhost:8082";
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePic, setProfilePic] = useState("");
  const [totalFinishedWorkItem, setTotalFinishedWorkItem] = useState(0);
  const [totalUnFinishedWorkItems, setTotalUnFinishedWorkItems] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(id, "from here");
    const fetchProjectDetails = async () => {
      try {
        setIsLoading(true);
        const response = await getProjectDetailsByProjectId(id);
        setIsLoading(false);
        console.log(response.data);
        setProjectDetails(response.data);
        if (response.data.project_profile_url != null) {
          setProfilePic(baseUrl + response.data.project_profile_url);
        }
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchProjectDetails(id);
  }, [id]);

  
  useEffect(() => {
    calculateFinishedAndUnFinishedWorkItems(projectDetails.workItems);
  }, [projectDetails]);

  const calculateFinishedAndUnFinishedWorkItems = (workItems) => {
    if (workItems) {
      let completedWorkItems = workItems.filter(
        (workItem) => workItem.status === "DONE"
      );
      setTotalFinishedWorkItem(completedWorkItems.length);
      let unFinishedWorkItem = workItems.length - completedWorkItems.length;
      setTotalUnFinishedWorkItems(unFinishedWorkItem);
      console.log(totalFinishedWorkItem, totalUnFinishedWorkItems);
    }
  };


  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);

    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setProfilePic(e.target.result);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const projectId = projectDetails.projectId;
      const response = await addProfileImageForProject(
        projectId,
        formData,
        config
      );
      toast.success("profile pic updated");
      console.log("Profile picture uploaded:", response.data);
    } catch (error) {
      console.log("Profile picture uploaded:", error.message);
    }
  };

  const showBoard = (projectId) =>{
    console.log(projectId)
    
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="project-container">
            <div className="flex flex-row items-center justify-between pr-3  py-2">
              <div className="flex flex-wrap items-center">
                <div>
                  <div className=" relative">
                    <img
                      src={profilePic || `/src/assets/workers.jpg`}
                      className="profile-img"
                      alt="Profile"
                    />
                    <label
                      htmlFor="fileInput"
                      className="edit-icon absolute bottom-0 right-5"
                    >
                      <CameraAltOutlined fontSize="small" color="primary" />{" "}
                      {/* Material UI styling */}
                    </label>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    hidden
                    id="fileInput"
                    onChange={handleFileChange}
                  />
                  <Button
                    className="mt-3"
                    variant="outlined"
                    onClick={handleUpload}
                  >
                    Upload Image
                  </Button>
                </div>
                <p className="text-3xl font-bold   p-5">
                  {projectDetails.title}
                </p>
              </div>
              <div className=" flex items-end">
                <InviteMemberModal
                  projectId={projectDetails.projectId}
                  onOpen={() => setOpen(true)}
                />
              </div>
            </div>

            <div className="flex flex-row items-center justify-between pr-3 border px-5   py-3">
              <div>
                <p className="text-2xl py-2 font-semibold">About the Project</p>
                <p className="opacity-12">{projectDetails.description}</p>
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
                  <div className="flex items-center">
                    <ListAlt className="text-gray mr-2" />
                    <span className="text-gray">
                      <b className="text-2xl">{totalUnFinishedWorkItems}</b>{" "}
                      Work Item Created
                    </span>
                  </div>
                  <div className="flex items-center">
                    <ListAlt className="text-gray mr-2" />
                    <span className="text-gray">
                      <b className="text-2xl font-semibold">
                        {totalFinishedWorkItem}
                      </b>{" "}
                      Work Item Completed
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-end">
                <Button 
                onClick={()=>showBoard(projectDetails.projectId)}
                variant="outlined">
                  <Edit /> 
                </Button>
              </div>
            </div>

            <div className="flex flex-row items-center justify-between pr-3 border px-5 py-3">
              <div>
                <p className="text-2xl py-2 font-semibold">Members</p>
                {projectDetails.assignedMembersDetailsList &&
                  projectDetails.assignedMembersDetailsList.map((member) => (
                    <div
                      key={member.id}
                      className="flex flex-row gap-5 items-center py-2"
                    >
                      <div>
                        <img
                          src={`http://localhost:8081${member.profile_image_url}`}
                          alt={"img"}
                          className="profile"
                        />
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
      )}
    </>
  );
}

export default ViewSingleProject;
