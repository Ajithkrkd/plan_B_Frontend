import React from 'react'
import './user.css'
function UserProfile() {
  return (
    <>
        <div className='profile-container'>
            <div className="max-w-4xl max-w-2sm mx-auto">
                <p>Profile</p>
                <div className='flex-col'>
                    <img src='/src/assets/workers.jpg'/>    
                    <button className='button --shine'>choose</button>
                </div>        
            </div>
        </div>
    </>
  )
}

export default UserProfile