import React, { useEffect, useState } from 'react'
import {} from '@mui/material';
import './home.css'
import './home.scss'
import {fetchUserDetails} from '../User/userUtils'



function Home() {
  const [userDetails ,setUserDetails] = useState({
      userId:'',
      fullName: '',
      phoneNumber: '',
      email:'',
      profileImagePath:'',
      joinDate : '',
      isEmailVerified :'',
      isBlocked:'',
      role:'',
  })

  useEffect(()=>{
    fetchUserDetails(setUserDetails);
    console.log(userDetails);
    console.log("times ")
    localStorage.setItem('user_details', userDetails);
    
  },[])




  return (
    <div className=" flex home-container flex-wrap justify-center items-center ">
       <div className='w-full sm:w-4/5 px-4 py-8 mb-8 sm:mb-0'>
          <div className='my-3'>
            <span className="text-4xl font-thin text-gray-900 dark:text-black pr-2">Plan your project with</span>
             <span className='main-header'>PLAN-B</span>
          </div>
          <div className='my-3'>
            <h3>Plan smarter, collaborate better, build your project with your plan</h3>
          </div>
          <div className='my-3'>
            <button className="button --shine">Start Now</button>
          </div>
       </div>
       <div className="">
        <img className="sm:p-5 object-cover" src="/src/assets/devops_boards.avif" />
      </div>
    </div>
  )
}

export default Home