import React, { useEffect, useState } from "react";
import ".././Project/project.css";
import CreateWorkItemModal from "./CreateWorkItemModal";;
import { Button } from "@mui/joy";
import { useParams } from "react-router-dom";
import ShowEachWorkItemAsModal from "./showEachWorkItemAsModal";
import Board from "../.././Components/boards/Board"; // Import the Board component
import WorkItemTableView from "./WorkItemTableView";
import { getAllWorkItems } from "../../Api/workItem";
import { getProjectDetailsByProjectId } from "../../Api/project";
function AllWorkItems() {
  const [workItems, setWorkItems] = useState([]);
  const { projectId } = useParams();
  const [projectMembers, setProjectMembers] = useState({})
  const [showCreateWorkItemModal, setShowCreateWorkItemModal] = useState(false);
  const [selectedLink, setSelectedLink] = useState("work-item-table"); // State to track the selected link
  const [singleWorkItemDetails, setSingleWorkItemDetails] = useState({
    workItemId: '',
    projectId: ''
  });
  

  useEffect(() => {
    getAllWorkItemByProjectId(projectId)
    getProjectDetails(projectId);
  },[])


  const getAllWorkItemByProjectId = async (projectId) => {
    try {
      const response = await getAllWorkItems(projectId);
      console.log(response)
      setWorkItems(response.data)
    } catch (error) {
      console.log(response)
    }
  }
  const getProjectDetails = async (projectId) => {
    try {
      const response = await getProjectDetailsByProjectId(projectId);
      console.log(response)
      setProjectMembers(response.data.assignedMembersDetailsList);
    } catch (error) {
      console.log(response)
    }
  }

  return (
    <>
      <div key={projectId} className="project-container">
        <div className="flex justify-between bg-gray-100 p-4">
          <div>
            <p className="text-xl font-semibold ">{projectId}</p>
          </div>
          <div className="flex space-x-4">
            <CreateWorkItemModal projectId={projectId} setWorkItems={setWorkItems}/>
           
            <Button
              variant="outlined"
              className="cursor-pointer underline"
              onClick={() => setSelectedLink("work-item-table")}
            >
              Work Item Table
            </Button>
            {/* Button to select the board */}
            <Button
              variant="outlined"
              className="cursor-pointer underline"
              onClick={() => setSelectedLink("boards")}
            >
              View As Board
            </Button>
          </div>
        </div>
        {/* Render the selected component based on the selected link */}
        {selectedLink === "work-item-table" ? (
          <>
          
          <WorkItemTableView workItems={workItems}  setSingleWorkItemDetails={setSingleWorkItemDetails} setShowCreateWorkItemModal={setShowCreateWorkItemModal} projectId={projectId} />
          
          </>
        ) : selectedLink === "boards" ? (
          <Board  workItemList={workItems} projectMembers={projectMembers} projectId={projectId}/> // Render the board component
        ) : null}
      </div>
      <ShowEachWorkItemAsModal
        isOpen={showCreateWorkItemModal}
        onClose={() => setShowCreateWorkItemModal(false)}
        creationDetials={singleWorkItemDetails}
      />
    </>
  );
}

export default AllWorkItems;


