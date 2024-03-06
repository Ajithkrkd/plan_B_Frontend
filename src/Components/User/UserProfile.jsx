import React, { useEffect, useState } from 'react'
import './user.css'
import { TextField, Typography } from '@mui/material'
import customAxios from '../../store/customAxios';
import {USER_BASE_SECURE_URL, USER_UPDATE_URL, fetchUserDetails, formateJoiningDateTime} from './userUtils'
import toast from 'react-hot-toast'
import { validate } from '../Auth/Validation';
import { useNavigate } from 'react-router-dom';
function UserProfile() {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState();
   
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber:'',
    });
   const [errors, setErrors] = useState({});  
   const [profilePic , setProfilePic] = useState(null)
   const [userDetails1 , setUserDetails]=useState({
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
      const userDetailsString = localStorage.getItem('userData');
      const userDetails = JSON.parse(userDetailsString);
      const {profile_image_path} = userDetails
      const {fullName,phoneNumber} = userDetails;
      setUserDetails(userDetails)
      setFormData({ // Set initial form data from user details
        fullName: fullName,
        phoneNumber:phoneNumber,
      });
      console.log(profile_image_path)
      setProfilePic(`http://localhost:8081${profile_image_path}`);
    },[])

  // when ever user type something in the input this fuction will handle START
    const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  // when ever user type something in the input this fuction will handle END
  const USER_ADD_PROFILEPIC = USER_BASE_SECURE_URL +'add_profile_image'

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await customAxios.post(
        USER_ADD_PROFILEPIC,
        formData,
        config
      );
      toast.success("profile pic updated");
      console.log("Profile picture uploaded:", response.data);
      fetchUserDetails(setUserDetails)
    } catch (error) {
      console.log("Profile picture uploaded:", error.message);
    }
  };

//showing image preview to user while user try to change the profile pic START
const handleFileChange = (e) => {
  setSelectedFile(e.target.files[0]);

  if (e.target.files && e.target.files[0]) {
    const reader = new FileReader();

    reader.onload = (e) => {
      setProfilePic(e.target.result); 
    };

    reader.readAsDataURL(e.target.files[0]);
  }
};
//showing image preview to user while user try to change the profile pic END
const handleValidation = () =>{
  const errors = validate(formData);
  setErrors(errors);
  return Object.keys(errors).length === 0; 
}

const updateUserDetails = async(e)=>{
  e.preventDefault();
  console.log(formData)
  if(!handleValidation())
  {
    console.log("not valid " + formData)
    toast.error('not valid');
    return;
  }
  try {
    const response = await customAxios.post(USER_UPDATE_URL ,formData);
    console.log(response.data)
    fetchUserDetails(setUserDetails);
    toast.success('Your details updated')
  } catch (error) {
    console.log(error.response.data)
  }

}

const formatedJoiningDate = formateJoiningDateTime(userDetails1.joinDate);

const handleLogout =()=>{
  localStorage.clear();
  toast.success("logout success")
  navigate('/');
  return;
}

  return (
    <>
        <div className="profile-container flex justify-left  ">
            <div className="max-w-4xl max-w-2sm mx-auto">
                <p className=" font-semibold profile-text">Profile</p>
                <div className="grid grid-cols-4 items-center justify-center gap-4">
                <img src={profilePic} className="profile-img flex" alt="Profile" />
                    <input
                    type="file" 
                    accept="image/*" 
                    className=" my-4 form-control" 
                    onChange={handleFileChange}
                    required
                    />
                    <button className="button --shine"
                    onClick={handleUpload}
                    >
                        add image
                    </button>
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
                  error={!! errors.phoneNumber}
                  helperText={errors.phoneNumber}
              />
            <button className='w-1/4  button --shine'
            onClick={updateUserDetails}
            >Save changes</button>
                  <div className='flex gap-3'>
                    <div>
                      <span>Email address : </span>
                    <span class="text-xl underline  text-blue-900 dark:text-blue">{userDetails1.email}</span>
                    </div>
                    <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2 py-2   dark:text-green-400 border border-green-400">verified</span>
                  </div>  
                </div>
                <div className="flex gap-3">
                  <div>
                    <span>Join date : </span>
                    <span class="text-blue-700 font-medium">{formatedJoiningDate}</span> </div>
                    
                </div>
                <div className="flex gap-3">
                  <div>
                    
                    <button className="button --shine mt-5"
                    onClick={handleLogout}
                    >logout</button>
                    
                     </div>
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default UserProfile