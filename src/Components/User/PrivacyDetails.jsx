import { Visibility, VisibilityOff, VpnLock } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import customAxios from '../../store/customAxios'
import toast from 'react-hot-toast'
import { USER_CHANGE_PASSWORD } from './userUtils'
import BasicModalDialog from './BasicModalDialog'
import { forgottPasswordValidation } from './validation'
import { useNavigate } from 'react-router-dom'

function PrivacyDetails() {
  const navigate = useNavigate();
  const [showPassword , setShowPassword] = useState()
  const [changePasswordRequest ,setChangePasswordRequest] = useState({
    currentPassword:'',
    newPassword:''
  })

  const [formData , setFormData] = useState({
    currentPassword:'',
    newPassword:'',
    confirmPassword:''
  })

  const [errors,setErrors]= useState({})


  const handleClickShowPassword = () =>{
    setShowPassword(!showPassword);
  }
  
  const handleInputChange =(e)=>{
      setFormData({...formData ,[e.target.name]:e.target.value})
      console.log(formData , 'form handleinputchange')
  }

  

  const handleValidation =()=>{
    const errors = forgottPasswordValidation(formData);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }


  const changePassword = async(e) =>{
    e.preventDefault();
    if(!handleValidation()){
      console.log('this form is not valid')
      console.log(errors)
      toast.error("Invalid data")
      return;
    }

    try {

      const response =  await customAxios.post(USER_CHANGE_PASSWORD,changePasswordRequest);
      console.log(response);
      toast.success('password changed successfully')
      navigate('/privacy-settings')
      
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.message)
    }

  }
  
  return (
    <div className='profile-container'>
      <p className='text-xl font-semibold underline my-3 text-blue-800'>Privacy Settings</p>
      <div className='w-2/4 flex-row'>
        <p className='my-2 '>Change My Password</p>

        <TextField
        label="Current password"
        variant="outlined"
        name="currentPassword"
        value={formData.currentPassword}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        type={showPassword ? 'text' : 'password'} 
        required
        error={!! errors.currentPassword}
        helperText={errors.currentPassword}

        InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
      />

        <TextField
        label="New password"
        variant="outlined"
        name="newPassword"
        value={formData.newPassword}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        type={showPassword ? 'text' : 'password'} 
        required
        error={!! errors.newPassword}
        helperText={errors.newPassword}

        InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
      />
        <TextField
        label="Confirm password"
        variant="outlined"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        type={showPassword ? 'text' : 'password'} 
        required
        error={!! errors.confirmPassword}
        helperText={errors.confirmPassword}

        InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
      />
     <div className='flex justify-content-between'>
     <button className='button --shine' 
      
      onClick={changePassword}

      >Change password</button>

      <BasicModalDialog/>
     </div>
      </div>




    </div>
  )
}

export default PrivacyDetails