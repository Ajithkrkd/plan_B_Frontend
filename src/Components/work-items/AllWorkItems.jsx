import React, { useEffect, useState } from "react";
import ".././Project/project.css";
import { Add } from "@mui/icons-material";
import CreateWorkItem from "./CreateWorkItem";
import { getAllProjectOfUser } from "../../Api/project";
import CreateWorkItemModal from "./CreateWorkItemModal";
import { getAllWorkItems } from "../../Api/workItem";
import { Button } from "@mui/joy";

function AllWorkItems() {
  const [selectedLink, setSelectedLink] = useState("work-items");
  const [projects, setProjects] = useState([]);
  const [workItems,setWorkItems] = useState([]);
  const [singleWorkItemDetails,setSingleWorkItemDetails] = useState({
    workItemId:'',
    projectId:''
  });

  useEffect(() => {
    getAllProjects();
  }, []);

  const getAllProjects = async () => {
    try {
      const response = await getAllProjectOfUser();
      console.log(response.data);
      setProjects(response.data);
      console.log(projects);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllWorkItemByProjectId = async(projectId)=>{
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
    setSelectedLink("work-item-create")
  };

  return (
    <>
      {selectedLink === "work-items" ? (
        <>
          {projects.map((project) => (
            <div key={project.projectId}>
              <div className="flex justify-between bg-gray-100 p-4">
                <div>
                  <p className="text-xl font-semibold ">{project.title}</p>
                </div>
                <div className="flex space-x-4">
                  <Button variant="outlined" onClick={()=>getAllWorkItemByProjectId(project.projectId)}>Show workItems</Button>
                  <CreateWorkItemModal projectId={project.projectId}/>
                  <p className="cursor-pointer ">Backlogs</p>
                  <p className="cursor-pointer ">View As Board</p>
                </div>
              </div>
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
                        {/* Add logic for Assigned To, State, and Tag if available */}
                        <td className="border px-4 py-2">John Doe</td>
                        <td className="border px-4 py-2">{item.state}</td>
                        <td className="border px-4 py-2">
                          <Button variant="outlined"
                          className="cursor-pointer underline"
                          onClick={()=>handleViewWorkItem(item.workItemId ,project.projectId)}
                          >View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </>
      ) : (
        <CreateWorkItem creationDetials={singleWorkItemDetails} />
      )}
    </>
  );
}

export default AllWorkItems;
