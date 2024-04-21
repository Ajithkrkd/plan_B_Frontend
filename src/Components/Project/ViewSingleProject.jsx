// ViewSingleProject.js
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "@mui/material";
import { Button } from "@mui/joy";
import { CameraAltOutlined, Edit, ListAlt } from "@mui/icons-material";
import InviteMemberModal from "./members/InviteMemberModal";
import {
  addProfileImageForProject,
  editProjectDescription,
  editProjectTitle,
  getProjectDetailsByProjectId,
} from "../../Api/project";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SingleProjectSkeleton from "./SingleProjectSkeleton";
import AssignedMembers from "./members/AssignedMembers"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Loader from "../../common/Loader";

function ViewSingleProject() {
  const [projectDetails, setProjectDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePic, setProfilePic] = useState("");
  const [totalFinishedWorkItem, setTotalFinishedWorkItem] = useState(0);
  const [totalUnFinishedWorkItems, setTotalUnFinishedWorkItems] = useState(0);
  const [titleEditing, setTitleEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState();
  const [editedDescription, setEditedDescription] = useState("");
  const [descriptionEditing, setDescriptionEditing] = useState(false)
  const [fetching ,setFetching] = useState(false);
  const navigate = useNavigate();
  const titleEditingInputRef = useRef(null);
  const descriptionEditingInputRef = useRef(null);
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setIsLoading(true);
        const response = await getProjectDetailsByProjectId(id);
        setIsLoading(false);
        console.log(response.data);
        setProjectDetails(response.data);
        if (response.data.project_profile_url != null) {
          setProfilePic(response.data.project_profile_url);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProjectDetails(id);
  }, [id]);

  useEffect(()=>{

  if (descriptionEditingInputRef.current) {
    descriptionEditingInputRef.current.focus(); 
  }
  if (titleEditingInputRef.current) {
    titleEditingInputRef.current.focus(); 
  }

  },[titleEditing,descriptionEditing])

   const handleTitleEditing = (title) =>{
    setEditedTitle(title);
    setTitleEditing(true);
   }

   const saveEditedTitle = async (projectId) => {
    try {
      setFetching(true)
      const response = await editProjectTitle(projectId, editedTitle)
      setProjectDetails((prevProjectDetails) => ({
        ...prevProjectDetails,
        title: editedTitle,
      }));
      setTitleEditing(false);

    } catch (error) {
      console.log(error)
    }finally{
      setFetching(false)
    }
   }
   const cancelTitleEdit = () =>{
    setTitleEditing(false);
    setEditedTitle("");
   }

   const handleDescriptionEditing = (title) =>{
    setEditedDescription(title);
    setDescriptionEditing(true);
   }

   const saveEditedDescription = async (projectId) => {
    if (editedDescription.trim() == "") {
      return;
    }
    try {
      setFetching(true);
      const response = await editProjectDescription(projectId,editedDescription)
      setProjectDetails((prevProjectDetails) => ({
        ...prevProjectDetails,
        description: editedDescription,
      }));
      console.log(response)
      setDescriptionEditing(false)
    } catch (error) {
      console.log(error)
    }finally{
      setFetching(false)
    }
   }
   const cancelDescriptioneEdit = () =>{
    setDescriptionEditing(false);
    setEditedDescription("");
   }

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

    if (selectedFile == null) {
      toast.error('select a image');
      return;
    }
    
    const storage = getStorage();
    const storageRef = ref(storage,selectedFile.name);
    try {
      setFetching(true);
        await uploadBytes(storageRef,selectedFile);
        const url = await getDownloadURL(storageRef);
        console.log(url)


      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const projectId = projectDetails.projectId;
      const response = await addProfileImageForProject(
        projectId,
        url,
        config
      );
      toast.success("profile pic updated");
      console.log("Profile picture uploaded:", response.data);
    } catch (error) {
      console.log("Profile picture uploaded:", error.message);
    }finally{
      setFetching(false);
    }
  };



  return (
    <>
      {isLoading ? (
        <SingleProjectSkeleton />
      ) : (
        <>
        {fetching && <Loader/>}
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
                      <CameraAltOutlined fontSize="small" color="primary" />
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
                {titleEditing ? (
                <div className="">
                  <Input
                  fullWidth
                    style={{ padding: 0 ,}}
                    inputRef={titleEditingInputRef}
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />
                  <Button
                    variant="soft"
                    color="success"
                    className="py-2 mt-2"
                    onClick={()=>saveEditedTitle(projectDetails.projectId)}
                  >
                    Save
                  </Button>
                  <Button
                    variant="soft"
                    color="danger"
                    className="py-2 mt-2"
                    onClick={cancelTitleEdit}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className=" flex justify-start gap-2">
                  <p className="text-xl font-bold italic p-0">
                    {projectDetails.title}
                  </p>
                  <Edit
                    className="comment_icons"
                    onClick={() => handleTitleEditing(projectDetails.title)}
                  />
                </div>
              )}
             
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
                {descriptionEditing ? (
                <div className="">
                  <Input
                  fullWidth
                    style={{ padding: 0 , width:'100%'}}
                    inputRef={descriptionEditingInputRef}
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                  />
                  <Button
                    variant="soft"
                    color="success"
                    className="py-2 mt-2"
                    onClick={()=>saveEditedDescription(projectDetails.projectId)}
                  >
                    Save
                  </Button>
                  <Button
                    variant="soft"
                    color="danger"
                    className="py-2 mt-2"
                    onClick={cancelDescriptioneEdit}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className=" flex  gap-2">
                  <p className="text   p-0">
                    {projectDetails.description}
                  </p>
                  <Edit
                    className="comment_icons"
                    
                    onClick={() => handleDescriptionEditing(projectDetails.description)}
                  />
                </div>
              )}
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
                <Button onClick={()=>navigate(`/project/${projectDetails.projectId}/work-items`)} variant="outlined">
                  manage
                </Button>
              </div>
            </div>

            <AssignedMembers assignedMembers={projectDetails.assignedMembersDetailsList} /> {/* Use the new component */}
          </div>
        </>
      )}
    </>
  );
}

export default ViewSingleProject;
