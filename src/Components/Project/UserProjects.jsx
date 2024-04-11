import React, { useEffect, useState } from "react";
import "./project.css";
import CreateProjectModal from "./CreateProjectModal";
import { getAllProjectOfUser } from "../../Api/project";
import toast from "react-hot-toast";
import LazyProjectsSkeleton from "./LazyProjectsSkeleton";

function UserProjects() {
  const baseUrl = `http://localhost:8082`;
  const [isLoading, setLoading] = useState(false);


  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getAllProjects = async () => {
      try {
        setLoading(true);
        const response = await getAllProjectOfUser();
        setLoading(false);
        console.log(response.data);
        setProjects(response.data);
        console.log(projects);
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast.error("projects is empty");
      }
    };
    getAllProjects();
  }, []);

  return (
    <>
      {isLoading ? (
        <LazyProjectsSkeleton />
      ) : (
        <>
          <div className="project-container flex-row">
            <div className="max-w-6xl flex gap-3 max-w-2sm mx-auto second-row">
              <p
                className={'cursor-pointer font-bold underline'}
              >
                Projects
              </p>
            </div>
            
                <div className="flex justify-end p-2">
                  <CreateProjectModal />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {projects &&
                    projects.map((project) => (
                      <a
                        key={project.projectId}
                        href={`project/${project.projectId}`}
                        className="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                      >
                        <div>
                          <img
                            className="profile-img"
                            src={
                              project.project_profile_url &&
                              baseUrl + project.project_profile_url
                            }
                            alt={project.title}
                          />
                        </div>
                        <div className="max-w-full mt-4">
                          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-black">
                            {project.title}
                          </h5>
                          <p className="font-normal text-gray-700 dark:text-400">
                            {project.description}
                          </p>
                        </div>
                 
                      </a>
                    ))}
                </div>
            
          </div>
        </>
      )}
    </>
  );
}

export default UserProjects;
