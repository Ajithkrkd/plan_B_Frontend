import React, { useEffect, useState } from "react";
import "./project.css";
import CreateProjectModal from "./CreateProjectModal";
import customAxios from "../../services/customAxios";

function UserProjects() {
  const [selectedLink, setSelectedLink] = useState("projects");

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getAllProjects = async () => {
      try {
        const response = await customAxios.get("/project/get_all_projects");
        console.log(response.data);
        setProjects(response.data);
        console.log(projects)
      } catch (error) {
        console.log(error);
      }
    };

    getAllProjects();
  }, []);

  return (
    <>
      <div className="user-container px-4 flex-row">
        <div className="max-w-4xl max-w-2sm mx-auto">
          <div className=" flex justify-between items-center rounded-lg ">
            <div>
              <span>User :</span>{" "}
              <span className="text-xl font-bold">sarathKumar@always</span>
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
        <div className="max-w-6xl flex-col gap-3  max-w-2sm mx-auto second-row">
          <a
            href="#"
            class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
                
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
                {project.title}
                </h5>
                <p class="font-normal text-gray-700 dark:text-gray-400">
                 {project.description}
                </p>
              
                
          </a>
        </div>
        </>
              ))}
      </div>
    </>
  );
}

export default UserProjects;
