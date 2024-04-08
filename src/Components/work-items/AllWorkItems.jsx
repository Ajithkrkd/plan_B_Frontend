import React, { useEffect, useState } from "react";
import ".././Project/project.css";
import CreateWorkItemModal from "./CreateWorkItemModal";
import { getAllWorkItems } from "../../Api/workItem";
import { Button } from "@mui/joy";
import { useParams } from "react-router-dom";
import ShowEachWorkItemAsModal from "./showEachWorkItemAsModal";
import Board from "../.././Components/boards/Board"; // Import the Board component

function AllWorkItems() {
  const [workItems, setWorkItems] = useState([]);
  const { projectId } = useParams();
  
  const [showCreateWorkItemModal, setShowCreateWorkItemModal] = useState(false);
  const [selectedLink, setSelectedLink] = useState("work-item-table"); // State to track the selected link
  const [singleWorkItemDetails, setSingleWorkItemDetails] = useState({
    workItemId: '',
    projectId: ''
  });
  
  useEffect(() => {
    getAllWorkItemByProjectId(projectId);
  }, [projectId]);

  const getAllWorkItemByProjectId = async (projectId) => {
    try {
      const response = await getAllWorkItems(projectId);
      console.log(response)
      setWorkItems(response.data)
    } catch (error) {
      console.log(response)
    }
  }

  const handleViewWorkItem = (workItemId, projectId) => {
    console.log(workItemId, projectId);
    setSingleWorkItemDetails({
      ...singleWorkItemDetails,
      workItemId: workItemId,
      projectId: projectId
    });
    console.log(singleWorkItemDetails)
    setShowCreateWorkItemModal(true);
  };

  return (
    <>
      <div key={projectId} className="project-container">
        <div className="flex justify-between bg-gray-100 p-4">
          <div>
            <p className="text-xl font-semibold ">{projectId}</p>
          </div>
          <div className="flex space-x-4">
            <CreateWorkItemModal projectId={projectId}/>
            <p className="cursor-pointer ">Backlogs</p>
            {/* Button to select the work item table */}
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
          <div className="bg-gray-200 p-4">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-400">
                  <th className="px-4 py-2 font-semibold text-white">
                    ID
                  </th>
                  <th className="px-4 py-2 font-semibold text-white">
                    Name
                  </th>
                  <th className="px-4 py-2 font-semibold text-white">
                    Assigned To
                  </th>
                  <th className="px-4 py-2 font-semibold text-white">
                    State
                  </th>
                  <th className="px-4 py-2 font-semibold text-white">
                    Tag
                  </th>
                </tr>
              </thead>
              <tbody>
                {workItems.map((item) => (
                  <tr key={item.workItemId}>
                    <td className="border px-4 py-2">{item.workItemId}</td>
                    <td className="border px-4 py-2">{item.title}</td>
                    <td className="border px-4 py-2">John Doe</td>
                    <td className="border px-4 py-2">{item.state}</td>
                    <td className="border px-4 py-2">
                      <Button
                        variant="outlined"
                        className="cursor-pointer underline"
                        onClick={() => handleViewWorkItem(item.workItemId, projectId)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : selectedLink === "boards" ? (
          <Board  workItems={workItems}/> // Render the board component
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
