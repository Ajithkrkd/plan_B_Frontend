import { Button, Input } from "@mui/joy";
import React, { useEffect, useState } from "react";
import AssignMembers from "./AssignMembers";
import StateSelector from "./StateSelector";
import { Attachment, Close, MessageOutlined, Save, SaveOutlined } from "@mui/icons-material";
import CommentSection from "./CommentSection";
import { TextField, Typography } from "@mui/material";
import AttachmentSection from "./AttachmentSection";
import WorkItemCategorySelector from "./WorkItemCategorySelctor";
import toast from 'react-hot-toast'
import { changeStateOfWorkItem, createWorkItem, getWorkItemById } from "../../Api/workItem";
import { createLabel, deletLabelByLabelId } from "../../Api/labels";
import Loader from '../../common/Loader'
function CreateWorkItem({ creationDetials }) {

  const [tag, setTag] = useState(""); 
  const [activeSection, setActiveSection] = useState("comments");
  const [title, setTitle] = useState(""); 
  const [workItemDetails, setWorkItemDetails] = useState({
    title: "",
    labels: []
  });
  const { projectId ,workItemId } = creationDetials;
  const [isLoading , setIsLoading] = useState(true);




  useEffect(() => {
    getWorkItemDetails(workItemId);
  }, []);


 const handleStateOfWorkItem = async (newState) => {
  console.log(newState)
  if(newState ==''){
    toast.error("please select again")
  }
  else
  
  try {
    console.log(workItemId)
    const response = await changeStateOfWorkItem(newState,workItemId);
    console.log(response.data)
    toast.success("you have changed state to " +newState)
  } catch (error) {
    console.log(error)
  }

};

  
  const getWorkItemDetails = async (workItemId) => {
    try {
      const response = await getWorkItemById(workItemId);
      setWorkItemDetails(response.data);
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false)
    }
  }

  const handleTagInputChange = (event) => {
    setTag(event.target.value);
  };

  const handleTagInputKeyDown = (event) => {
    if (event.key === "Enter") {
      submitTag();
    }
  };

  const submitTag = () => {
    handleLabelSubmission(workItemId, tag);
  };

  const handleLabelSubmission = async (workItemId, tag) => {
    try {
      const response = await createLabel(workItemId, tag);
      console.log(response);
      const newLabel = { labelName: tag };
      setWorkItemDetails(prevState => ({
        ...prevState,
        labels: [...prevState.labels, newLabel] // Add the new label to the existing labels array
      }));      
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteLabel = async (labelId) => {

      try {
        const response = await deletLabelByLabelId(workItemId,labelId);
        console.log(response.data);

        setWorkItemDetails(prevState => ({
          ...prevState,
          labels: prevState.labels.filter(label => label.labelId !== labelId) // Remove the label from the labels array
        }));

      } catch (error) {
        console.log(error)

      }
  };

  const handleTitleInputChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSave = async () => {
    if (title.trim() === '') {
      toast.error("Work Item title cannot be empty!!");
      return;
    }
    
    try {
      const response = await createWorkItem(title, projectId);
      console.log(response);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
   <>
   {isLoading && isLoading ?
   <Loader/>
   
   :
   <>
   
   <div className="pl-5 py-3 px-3 border">
      <div className="flex justify-between px-3 py-3">
        <Button variant="outlined" onClick={handleSave}><SaveOutlined />Save</Button>
      </div>
      <div>
        <div className="py-3">
          <Input
            placeholder="Enter Title"
            value={workItemDetails.title}
            onChange={handleTitleInputChange} 
          />
        </div>
        <div className="flex gap-3">
          <AssignMembers />
          <StateSelector onStateSelector={handleStateOfWorkItem} />
          <Input
            variant="outlined"
            placeholder="Add tag +"
            value={tag}
            onChange={handleTagInputChange}
            onKeyDown={handleTagInputKeyDown}
          />
          <Button
            color="neutral"
            variant="outlined"
            onClick={() => setActiveSection("comments")}
          >
            <MessageOutlined color="primary" /> Comments
          </Button>
          <Button
            color="neutral"
            variant="outlined"
            onClick={() => setActiveSection("attachments")}
          ><Attachment color="primary"/> Attachments</Button>
        </div>
        <div className="p-3">
          {/* Display labels */}
          {workItemDetails.labels.map((label, index) => (
           
            <span className="bg-blue-200 px-2 py-1 rounded-md mr-2">{label.labelName}
            <Close onClick={() => handleDeleteLabel(label.labelId)} style={{ cursor: 'pointer', fontSize: '16px', verticalAlign: 'middle' ,paddingLeft:"5px" }} />
            </span>
            
        
          ))}
        </div>
        <div className="py-3">
          <Typography>Description</Typography>
          <TextField 
            fullWidth 
            multiline
            maxRows={10}
            placeholder="Add a short description "
          />
        </div>
        {activeSection === "comments" ? <CommentSection workItemId={workItemId} workItemDetails={workItemDetails} /> : <AttachmentSection />}
      </div>
    </div>
   </>
   }
   </>
  );
}

export default CreateWorkItem;
