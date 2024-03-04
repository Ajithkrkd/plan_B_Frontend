import React, { useState } from 'react'
import './project.css'
function UserProjects() {

    const [selectedLink, setSelectedLink] = useState(null);

    const handleLinkClick = (link) => {
        setSelectedLink(link);
    };


    

    
  return (
    <>
    <div className="user-container px-4 flex-row">
      <div className="max-w-4xl max-w-2sm mx-auto">
        <div className=" flex justify-between items-center rounded-lg ">
        <div><span>User :</span>  <span className="text-xl font-bold">sarathKumar@always</span></div>
          <button className="button --shine">
           + New Project
          </button>
        </div>
      </div>
      <div className="max-w-6xl flex gap-3  max-w-2sm mx-auto second-row">
      <p
                    className={`cursor-pointer ${selectedLink === 'projects' ? 'font-bold underline' : ''}`}
                    onClick={() => handleLinkClick('projects')}
                >
                    Projects
                </p>
                <p
                    className={`cursor-pointer ${selectedLink === 'myWorkItems' ? 'font-bold underline' : ''}`}
                    onClick={() => handleLinkClick('myWorkItems')}
                >
                    My work items
                </p>
      </div>
        <div className="max-w-6xl flex gap-3  max-w-2sm mx-auto second-row">
        <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">Noteworthy technology acquisitions 2021</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        </a>
        </div>
    </div> 
    
    </>
  )
}

export default UserProjects