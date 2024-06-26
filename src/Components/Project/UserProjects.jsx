import React, { useEffect, useState } from "react";
import CreateProjectModal from "./CreateProjectModal";
import { getAllProjectOfUser } from "../../Api/project";
import toast from "react-hot-toast";
import LazyProjectsSkeleton from "./LazyProjectsSkeleton";
import EmptyBox from "../../assets/looking.svg";
import ProjectLogo from "../../assets/projectIcon.svg";
function UserProjects() {
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
          <div className="flex-row px-3 project-container">
            <div className="text-xl second-row ">
              <p className={"cursor-pointer font-bold underline"}>Projects</p>
            </div>

            <div className="flex justify-end p-2">
              <CreateProjectModal />
            </div>
            {
            projects.length <= 0 && (
                <>
               <div className="items-center flex 
               sm:flex-row flex-col
               justify-center w-full"
               
               >
                <img src={EmptyBox} className="mt-5"
                 style={{width:'300px'}}
                alt="project empty" />
                <p className="text-2xl font-serif text-center">
                  You haven't created any projects.
                  <br/> Please create one.</p>
                </div>

                </>
              )
            }

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {projects &&
                projects.map((project) => (
                  <a
                    key={project.projectId}
                    href={`project/${project.projectId}`}
                    className="flex flex-col items-center
                     p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    <div>
                      <img
                        className="profile-img"
                        src={
                          project.project_profile_url ?
                          project.project_profile_url : ProjectLogo
                        }
                        alt={project.title}
                      />
                    </div>
                    <div className="max-w-full flex-col flex  items-center  mt-4">
                      <h5 className="mb-2 text-2xl font-semibold tracking-tight text-center text-gray-900 dark:text-black">
                        {project.title}
                      </h5>

                      <p className="font-semibold italic text-gray-700 dark:text-400">
                        <span className="font-normal">Created By </span>{" "}
                        {project.projectRootAdministratorEmail}
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
