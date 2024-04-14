import { Button } from "@mui/joy";
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
} from "@mui/icons-material";
import { Input, TextField } from "@mui/material";
import CommentSection from "./comments/CommentSection";
import AttachmentSection from "./attachments/AttachmentSection";
import toast from "react-hot-toast";
import {
  changeStateOfWorkItem,
  createWorkItem,
  getWorkItemById,
  updateWorkItemDescription,
  updateWorkItemTitle,
} from "../../Api/workItem";
import { createLabel, deletLabelByLabelId } from "../../Api/labels";
import Loader from "../../common/Loader";
import "./comments/comment.css";
import ChildWorkItemSection from "./childWorkItems/ChildWorkItemSection";

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
    labels: [],
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
  useEffect(() => {
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
    getWorkItemDetails(workItemId);
  }, []);

  useEffect(() => {
    if (titleEditingRef.current) {
      titleEditingRef.current.focus();
    }
    if (descriptionEditingInputRef.current) {
      descriptionEditingInputRef.current.focus();
    }
  }, [titleEditing, descriptionEditing]);

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
      const response = await createLabel(workItemId, tag);
      console.log(response);
      const newLabel = { labelName: tag };
      setWorkItemDetails((prevState) => ({
        ...prevState,
        labels: [...prevState.labels, newLabel], // Add the new label to the existing labels array
      }));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteLabel = async (labelId, workID) => {
    try {
      console.log(workID, labelId + "from here");
      const response = await deletLabelByLabelId(workID, labelId);
      console.log(response.data);

      setWorkItemDetails((prevState) => ({
        ...prevState,
        labels: prevState.labels.filter((label) => label.labelId !== labelId), // Remove the label from the labels array
      }));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
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

  return (
    <>
      {isLoading && isLoading ? <Loader /> : <></>}
      <>
        <p style={{ float: "right", padding: 10 }}>
          <CropTwoTone color="error" />
          {workItemDetails.category}
        </p>
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
              {/* Display labels */}

              {workItemDetails.labels.map((label, index) => (
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
              ))}
            </div>
            <div className="py-3">
              <p className="text-lg font-semibold underline">
                Child Work Items
              </p>
            </div>
            {activeSection === "childComponent" ? (
              <ChildWorkItemSection workItem={workItemDetails} />
            ) : (
              <div className="pl-5 py-3 px-3 border">
                {activeSection === "comments" ? (
                  <CommentSection
                    workItemId={workItemId}
                    workItemDetails={workItemDetails}
                  />
                ) : activeSection === "attachments" ? (
                  <AttachmentSection workItemId={workItemId} />
                ) : null}
              </div>
            )}
          </div>
        </div>
      </>
    </>
  );
}

export default CreateWorkItem;
