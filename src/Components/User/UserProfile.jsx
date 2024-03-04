import React, { useState } from 'react'
import './user.css'
import { TextField } from '@mui/material'
function UserProfile() {


    
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber:'',
        email: '',
    });
    
  const [errors, setErrors] = useState({});  


  // when ever user type something in the input this fuction will handle START
    const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  // when ever user type something in the input this fuction will handle END
  
  return (
    <>
        <div className="profile-container flex justify-left  ">
            <div className="max-w-4xl max-w-2sm mx-auto">
                <p className=" font-semibold profile-text">Profile</p>
                <div className="grid grid-cols-4 items-center justify-center gap-4">
                    <img src="/src/assets/workers.jpg" className="profile-img flex" alt="Profile"/>
                    <button className="bg-primary">Choose</button>
                </div>

                <div className="flex flex-col gap-2">
                <TextField
                label="Full Name"
                variant="outlined"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                fullWidth 
                margin="normal" 
                required 
                error={!! errors.fullName}
                helperText={errors.fullName}
            />
            <TextField
                label="phoneNumber"
                variant="outlined"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                fullWidth
                margin="normal"
                type="phoneNumber"
                required
                error={!! errors.phoneNumber}
                helperText={errors.phoneNumber}
            />
            <TextField
                label="Email"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
                type="email" 
                required
                error={!! errors.email}
                helperText={errors.email}
            />
                        
                    </div>
            </div>
        </div>
    </>
  )
}

export default UserProfile