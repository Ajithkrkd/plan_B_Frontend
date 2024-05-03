import { Button, Typography } from "@mui/joy";
import React, { useEffect, useRef, useState } from "react";
import AssignMembers from "./members/AssignMembers";
import StateSelector from "./state/StateSelector";
import {
  Assignment,
  Attachment,
  Close,
  CropTwoTone,
  Edit,
  MessageOutlined,
  SyncProblem,
  Task,
} from "@mui/icons-material";
import {
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  Input,
  TextField,
} from "@mui/material";
import CommentSection from "./comments/CommentSection";
import AttachmentSection from "./attachments/AttachmentSection";
import toast from "react-hot-toast";
import {
  assignToWorkLifeCycle,
  changeStateOfWorkItem,
  createWorkItem,
  getWorkItemById,
  requestForChangingWorkItemDeadLine,
  updateWorkItemDescription,
  updateWorkItemTitle,
} from "../../Api/workItem";
import { createLabel, deletLabelByLabelId } from "../../Api/labels";
import Loader from "../../common/Loader";
import "./comments/comment.css";
import ChildWorkItemSection from "./childWorkItems/ChildWorkItemSection";
import { getAllWorkLifeCycle } from "../../Api/workLifeCycle";


function CreateWorkItem({ creationDetials }) {
  const [tag, setTag] = useState("");
  const [activeSection, setActiveSection] = useState("comments");
  const [title, setTitle] = useState("");
  const [workItemDetails, setWorkItemDetails] = useState({
    archived: false,
    attachments: [],
    comments: [],
    category: "",
    createdAt: "",
    deleted: false,
    description: "",
    labels: [
      {
        labelId: "",
        labelName: "",
        createdBy: "",
      },
    ],
    memberAssigned: 1,
    parentWorkItemId: null,
    projectId: null,
    state: "",
    title: "",
    workItemId: null,
    workingLifeCycle: null,
  });

  const { projectId, workItemId } = creationDetials;
  const [isLoading, setIsLoading] = useState(true);
  const [editedTitle, setEditedTitle] = useState("");
  const [titleEditing, setTitleEditing] = useState(false);
  const [descriptionEditing, setDescriptionEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");
  const [assignedMemberId, setAssignedMemberId] = useState(null);
  const titleEditingRef = useRef(null);
  const descriptionEditingInputRef = useRef(null);
  const reasonRef = useRef(null);
  const [selectedCycleId, setSelectedCycleId] = useState("");
  const [workLifeCycles, setWorkLifeCycles] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [extendingReason, setExtendingReason] = useState("")
  const [showApplyButton , setShowApplyButton] = useState(true)
  useEffect(() => {
    getWorkItemDetails(workItemId);
    fetchWorkingCycle();
  }, []);

  useEffect(() => {
    if (titleEditingRef.current) {
      titleEditingRef.current.focus();
    }
    if (descriptionEditingInputRef.current) {
      descriptionEditingInputRef.current.focus();
    }
  }, [titleEditing, descriptionEditing]);



  const getWorkItemDetails = async (workItemId) => {
    try {
      setIsLoading(true);
      const response = await getWorkItemById(workItemId);
      const workitems = response.data;
      setWorkItemDetails(workitems);
      setAssignedMemberId(workitems.memberAssigned);
      console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWorkingCycle = async () => {
    try {
      const response = await getAllWorkLifeCycle();
      console.log(
        response.data,
        "----------------------------------------------------------------"
      );
      setWorkLifeCycles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStateOfWorkItem = async (newState) => {
    console.log(newState);
    if (newState == "") {
      toast.error("please select again");
    } else
      try {
        console.log(workItemId);
        const response = await changeStateOfWorkItem(newState, workItemId);
        console.log(response.data);
        toast.success("you have changed state to " + newState);
      } catch (error) {
        console.log(error);
      }
  };

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
      if (tag === "") {
        toast.error("please Enter label name !!");
        return;
      }
      setIsLoading(true);
      const response = await createLabel(workItemId, tag);
      console.log(response);
      const newLabel = {
        labelId: response.data.labelId,
        labelName: tag,
        createdBy: response.data.createdBy,
      };
      setWorkItemDetails((prevState) => ({
        ...prevState,
        labels: [...prevState.labels, newLabel],
      }));
      toast.success("Label added Successfully ");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setTag("");
      setIsLoading(false);
    }
  };

  const handleDeleteLabel = async (labelId, workID) => {
    try {
      setIsLoading(true);
      console.log(workID, labelId + "from here");
      if (workID === "" || labelId === "") {
        toast.error("something went wrong try later");
        return;
      }
      const response = await deletLabelByLabelId(workID, labelId);
      console.log(response.data);
      toast.success("Label removed Successfully")

      setWorkItemDetails((prevState) => ({
        ...prevState,
        labels: prevState.labels.filter((label) => label.labelId !== labelId), // Remove the label from the labels array
      }));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTitleInputChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSave = async () => {
    if (title.trim() === "") {
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

  //update title and description
  const handleEditTitle = (title) => {
    setTitleEditing(true);
    setEditedTitle(title);
  };
  const cancelEdit = () => {
    setTitleEditing(false);
  };

  const saveEditedTitle = async () => {
    if (editedTitle.trim() == "") {
      toast.error("Title must not empty");
      return;
    }
    try {
      setIsLoading(true);
      const response = await updateWorkItemTitle(editedTitle, workItemId);
      setIsLoading(false);
      console.log(response.data);
      setWorkItemDetails((prevState) => ({
        ...prevState,
        title: editedTitle,
      }));
      toast.success("Title updated !!");
      setTitleEditing(false);
    } catch (error) {
      setTitleEditing(false);
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const handleDescriptionEditing = (description) => {
    setDescriptionEditing(true);
    setEditedDescription(description);
  };

  const saveEditedDescription = async () => {
    if (editedDescription.trim() == "") {
      toast.error("Description must not empty");
      return;
    }
    try {
      setIsLoading(true);
      const response = await updateWorkItemDescription(
        editedDescription,
        workItemId
      );
      console.log(response.data);
      setWorkItemDetails((prevState) => ({
        ...prevState,
        description: editedDescription,
      }));
      setIsLoading(false);
      toast.success("Description updated !!");
      setDescriptionEditing(false);
    } catch (error) {
      setDescriptionEditing(false);
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  };
  const cancelEditDescription = () => {
    setDescriptionEditing(false);
  };

  const handleCycleChange = (event) => {
    setSelectedCycleId(event.target.value);
  };
  const handleSubmition = async () => {
    console.log(selectedCycleId);
    if (selectedCycleId == "") {
      toast.error("select cycle");
      return;
    }
    if (projectId == '') {
      console.log("project id is not find")
      return;
    }
    try {
      setIsLoading(true);
      const response = await assignToWorkLifeCycle(workItemId,selectedCycleId,projectId);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setSelectedCycleId("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setSelectedCycleId("");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const handleViewDeadLine = () => {
    setPreviewOpen(true);
    reasonRef.current.focus();
  };

  const handleClosePreview = () => {
    setPreviewOpen(false);
  };

  const handleTextAreaChange  = (e) =>{
    setExtendingReason(e.target.value)
    const words = extendingReason.split(/\s+/).filter(word => word.length > 0);
    if (words.length >= 10) {
      setShowApplyButton(false);
    }else{
      setShowApplyButton(true);
    }
  }

  const handleExtentionApply = async ()=>{
    const words = extendingReason.split(/\s+/).filter(word => word.length > 0);
    console.log(words)
    if (words.length <= 10) {
      toast.error("reason should contain minimun 10 words !");
      return;
    } 
     console.log(workItemDetails.workItemId);
     const id = workItemDetails.workItemId;
    try {

      setIsLoading(true);
      const response = await requestForChangingWorkItemDeadLine(id ,extendingReason);
      console.log(response);
      toast.success("request was sent successfully");

      
    } catch (error) {
      console.log(error)
    }
    finally{
      setPreviewOpen(false);
      setExtendingReason("");
      setIsLoading(false);
    }
  }



  return (
    <>
      {isLoading && isLoading ? <Loader /> : <></>}
      <>
        <span style={{ float: "right", padding: 10 }}>
          {workItemDetails.category === "EPIC" && <CropTwoTone color="error" />}
          {workItemDetails.category === "ISSUE" && (
            <SyncProblem color="warning" />
          )}
          {workItemDetails.category === "TASK" && <Task color="success" />}
          {workItemDetails.category}
        </span>
        <div className="pl-5 py-3 px-3 border">
          <div>
            <div className="flex pb-3">
              <p className="text-gray font-semibold pr-3 italic">
                Work Item Title :{" "}
              </p>

              {titleEditing ? (
                <div className="">
                  <Input
                    style={{ padding: 0 }}
                    inputRef={titleEditingRef}
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />
                  <Button
                    variant="soft"
                    color="success"
                    className="py-2 mt-2"
                    onClick={saveEditedTitle}
                  >
                    Save
                  </Button>
                  <Button
                    variant="soft"
                    color="danger"
                    className="py-2 mt-2"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className=" flex justify-start gap-2">
                  <p className="text-xl font-bold italic p-0">
                    {workItemDetails.title}
                  </p>
                  <Edit
                    className="comment_icons"
                    onClick={() => handleEditTitle(workItemDetails.title)}
                  />
                </div>
              )}
            </div>
            <div>
              <p className="text-gray font-semibold pr-3 italic">
                Work Item Description :{" "}
              </p>
              <div
                className=""
                style={{
                  height: "130px",
                  overflowY: "scroll",
                  padding: "10px",
                  backgroundColor: "#FFF",
                  border: "0.5px solid black",
                  marginBottom: 10,
                }}
              >
                {descriptionEditing ? (
                  <div className="">
                    <Input
                      fullWidth
                      style={{ padding: 0 }}
                      inputRef={descriptionEditingInputRef}
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                    />
                    <Button
                      variant="soft"
                      color="success"
                      className="py-2 mt-2"
                      onClick={saveEditedDescription}
                    >
                      Save
                    </Button>
                    <Button
                      variant="soft"
                      color="danger"
                      className="py-2 mt-2"
                      onClick={cancelEditDescription}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <>
                    <span className="italic font-semibold text-gray-600 pr-2">
                      {workItemDetails.description}
                    </span>
                    <Edit
                      className="comment_icons"
                      onClick={() => {
                        handleDescriptionEditing(workItemDetails.description);
                      }}
                    />
                  </>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              {workItemDetails.state && (
                <StateSelector
                  initialState={workItemDetails && workItemDetails.state}
                  onStateSelector={handleStateOfWorkItem}
                />
              )}
              {workItemDetails.projectId && (
                <AssignMembers workItemDetails={workItemDetails} />
              )}

              <TextField
                variant="outlined"
                placeholder="Add tag +"
                value={tag}
                onChange={handleTagInputChange}
                onKeyDown={handleTagInputKeyDown}
                style={{ flex: 1, padding: "0px" }}
              />
              <Button
                color="neutral"
                variant="outlined"
                onClick={() => setActiveSection("comments")}
                style={{ flex: 1, minWidth: 0 }}
              >
                <MessageOutlined color="primary" fontSize="small" /> Comments
              </Button>
              <Button
                color="neutral"
                variant="outlined"
                onClick={() => setActiveSection("attachments")}
                style={{ flex: 1, minWidth: 0 }}
              >
                <Attachment color="info" fontSize="small" /> Attachments
              </Button>
              <Button
                color="neutral"
                variant="outlined"
                onClick={() => setActiveSection("childComponent")}
                style={{ flex: 1, minWidth: 0 }}
              >
                <Assignment color="info" fontSize="small" /> Child workItems
              </Button>
            </div>
            <div className="p-3">
              {workItemDetails.labels &&
                workItemDetails.labels.map(
                  (label) =>
                    label.labelId && (
                      <span
                        key={label.labelId}
                        className="bg-blue-200 px-2 py-1 rounded-md mr-2"
                      >
                        {label.labelName}
                        <Close
                          onClick={() =>
                            handleDeleteLabel(
                              label.labelId,
                              workItemDetails.workItemId
                            )
                          }
                          style={{
                            cursor: "pointer",
                            fontSize: "16px",
                            verticalAlign: "middle",
                            paddingLeft: "5px",
                          }}
                        />
                      </span>
                    )
                )}
            </div>
            <div className="py-3">
              {workItemDetails.workingLifeCycle ? (
                <>
                  <div
                    className="border"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={handleViewDeadLine}
                  >
                    <Button
                      variant="soft"
                      style={{ borderRadius: "0px" }}
                      className="text-lg font-bold"
                    >
                      Work Life Cycle - Name :{" "}
                    </Button>

                    <span
                      className="text-xl italic"
                      style={{ paddingLeft: "100px" }}
                    >
                      {workItemDetails.workingLifeCycle.title.toUpperCase()}
                    </span>

                    <Alert variant="standard" color="info" severity="info">
                      This is Time duration for completing this work{" "}
                    </Alert>
                  </div>
                </>
              ) : (
                <>
                  <select
                    value={selectedCycleId || ""}
                    onChange={handleCycleChange}
                    className="mr-2"
                    style={{
                      width: "200px",
                      outline: "none",
                      padding: "10px",
                      border: "1px solid black",
                    }}
                  >
                    <option value="">Select DeadLine</option>
                    {workLifeCycles &&
                      workLifeCycles.map((cycle) => (
                        <option
                          key={cycle.workingLifeCycleId}
                          value={cycle.workingLifeCycleId}
                        >
                          <p className="font-bold">{cycle.title}</p> from{" "}
                          <p className="text-blue-500">
                            {formatDate(cycle.startDate)}
                          </p>{" "}
                          <p className="font-bold">To </p>
                          <p className="text-red-500">
                            {formatDate(cycle.endDate)}
                          </p>
                        </option>
                      ))}
                  </select>
                  <Button
                    style={{ padding: 10, margin: 7 }}
                    variant="soft"
                    onClick={handleSubmition}
                  >
                    Assign
                  </Button>
                  <Button
                    style={{ padding: 10, margin: 7 }}
                    variant="soft"
                    color="danger"
                    onClick={handleCancel}
                  >
                    cancel
                  </Button>
                </>
              )}
            </div>
            {activeSection === "childComponent" ? (
              <>
                <p className="text-lg font-semibold underline">
                  Child Work Items
                </p>
                <ChildWorkItemSection workItem={workItemDetails} />
              </>
            ) : (
              <div className="pl-5 py-3 px-3 border">
                {activeSection === "comments" ? (
                  <>
                    <p className="text-lg font-semibold underline">Comments</p>
                    <CommentSection
                      workItemId={workItemId}
                      workItemDetails={workItemDetails}
                    />
                  </>
                ) : activeSection === "attachments" ? (
                  <>
                    <p className="text-lg font-semibold underline">
                      Attachments
                    </p>
                    <AttachmentSection workItemId={workItemId} />
                  </>
                ) : null}
              </div>
            )}
          </div>
        </div>
        <Dialog
          open={previewOpen}
          onClose={handleClosePreview}
          style={{ padding: "20px" }}
          fullWidth
        >
          <DialogTitle>Work Life Cycle Details</DialogTitle>
          <DialogContent>
            <div>
              {workItemDetails.workingLifeCycle && (
                <>
                  <div className="border flex justify-between p-2 ">
                    <span className="font-semibold text-lg italic">Title </span>
                    <span
                      className="px-4 py-1"
                      style={{ backgroundColor: "#4B84BE", color: "#FFF" }}
                    >
                      {workItemDetails.workingLifeCycle.title.toUpperCase()}
                    </span>
                  </div>
                  <div className="border flex justify-between p-2">
                    <span className="font-semibold text-lg italic">
                      Start Date{" "}
                    </span>{" "}
                    <span
                      className="px-4 py-1"
                      style={{ backgroundColor: "#4B84BE", color: "#FFF" }}
                    >
                      {formatDate(workItemDetails.workingLifeCycle.startDate)}
                    </span>
                  </div>
                  <div className="border flex justify-between p-2">
                    <span className="font-semibold text-lg italic">
                      End Date{" "}
                    </span>{" "}
                    <span
                      className="px-4 py-1"
                      style={{ backgroundColor: "#4B84BE", color: "#FFF" }}
                    >
                      {formatDate(workItemDetails.workingLifeCycle.endDate)}
                    </span>
                  </div>
                  <Alert className="my-2" severity="info">Do you want to Extend Time ?</Alert>
                  <div className="border flex justify-between my-2">
                    <textarea
                     style={{
                      padding:"5px",
                      outline: "none",
                      border: "1px solid black",
                      width: "100%",
                      height:"100px",
                      
                    
                     }}
                     placeholder="Reason for Extending Time ? should contain atleast 10 words"  
                     ref={reasonRef}
                     value={extendingReason}
                     onChange={handleTextAreaChange}
                    />
                    
                  </div>
                  <Button 
                  disabled={showApplyButton}
                  onClick={handleExtentionApply}
                  fullWidth className="mt-4" color="success" variant="solid">
                      Apply
                    </Button>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </>
    </>
  );
}

export default CreateWorkItem;
