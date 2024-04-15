import React, { useEffect, useState } from "react";
import ".././Project/project.css";
import CreateWorkItemModal from "./CreateWorkItemModal";;
import { Button } from "@mui/joy";
import { useParams } from "react-router-dom";
import ShowEachWorkItemAsModal from "./showEachWorkItemAsModal";
import Board from "../.././Components/boards/Board"; // Import the Board component
import WorkItemTableView from "./WorkItemTableView";
import { useDispatch, useSelector } from "react-redux";
import { allWorkItems, getWorkItemErrors, getWorkItemStatus,fetchWorkItems } from "./slices/workitem/workItemSlice";
function AllWorkItems() {
  const [workItems, setWorkItems] = useState([]);
  const { projectId } = useParams();
  
  const [showCreateWorkItemModal, setShowCreateWorkItemModal] = useState(false);
  const [selectedLink, setSelectedLink] = useState("work-item-table"); // State to track the selected link
  const [singleWorkItemDetails, setSingleWorkItemDetails] = useState({
    workItemId: '',
    projectId: ''
  });
  
  const dispatch = useDispatch();
  const workItemsList = useSelector(allWorkItems);
  const workItemsStatus = useSelector(getWorkItemStatus);
  const workItemsError = useSelector(getWorkItemErrors);
  useEffect(() => {
    if (workItemsStatus === "idle") {
      dispatch(fetchWorkItems(projectId));
      setWorkItems(workItemsList)
    }
  }, [dispatch, projectId]);

  // const getAllWorkItemByProjectId = async (projectId) => {
  //   try {
  //     const response = await getAllWorkItems(projectId);
  //     console.log(response)
  //     setWorkItems(response.data)
  //   } catch (error) {
  //     console.log(response)
  //   }
  // }
 

  return (
    <>
      <div key={projectId} className="project-container">
        <div className="flex justify-between bg-gray-100 p-4">
          <div>
            <p className="text-xl font-semibold ">{projectId}</p>
          </div>
          <div className="flex space-x-4">
            <CreateWorkItemModal projectId={projectId}/>
           
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
          
          <WorkItemTableView workItems={workItemsList}  setSingleWorkItemDetails={setSingleWorkItemDetails} setShowCreateWorkItemModal={setShowCreateWorkItemModal} projectId={projectId} />
          
          </>
        ) : selectedLink === "boards" ? (
          <Board  workItems={workItemsList}/> // Render the board component
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


