import React, { useEffect, useState } from "react";
import "./project.css";
import CreateProjectModal from "./CreateProjectModal";
import { getAllProjectOfUser } from "../../Api/project";

function UserProjects() {
  const [selectedLink, setSelectedLink] = useState("projects");

  const handleLinkClick = (link) => {
    window.location.reload();
    setSelectedLink(link);
  };

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getAllProjects = async () => {
      try {
        const response = await getAllProjectOfUser();
        console.log(response.data);
        setProjects(response.data);
        console.log(projects)
      } catch (error) {
        console.log(error);
      }
    };
    getAllProjects();
  }, [projects]);
  
  return (
    <>
      <div className="project-container flex-row">
        <div className="max-w-4xl max-w-2sm mx-auto">
          <div className=" flex justify-between items-center rounded-lg ">
            <div>
              {/* <span>User :</span>{" "}
              <span className="text-xl font-bold">{}</span> */}
            </div>
            <CreateProjectModal />
          </div>
        </div>
        <div className="max-w-6xl flex gap-3  max-w-2sm mx-auto second-row">
          <p
            className={`cursor-pointer ${
              selectedLink === "projects" ? "font-bold underline " : ""
            }`}
            onClick={() => handleLinkClick("projects")}
          >
            Projects
          </p>
          <p
            className={`cursor-pointer ${
              selectedLink === "myWorkItems" ? "font-bold underline" : ""
            }`}
            onClick={() => handleLinkClick("myWorkItems")}
          >
            My work items
          </p>
        </div>
        
        {projects &&   projects.map((project)=>(
                <>
          <a
            href={`project/${project.projectId}`}
            class="flex  text-center p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
        <div className="max-w-6xl flex-wrap gap-3  max-w-2sm mx-auto second-row">
                
                <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-black">
                {project.title}
                </h5>
                <p class="font-normal text-gray-700 dark:text-400">
                 {project.description}
                </p>
              
                
        </div>
          </a>
        </>
              ))}
      </div>
    </>
  );
}

export default UserProjects;
