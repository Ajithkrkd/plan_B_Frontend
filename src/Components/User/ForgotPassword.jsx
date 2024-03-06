import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom'
import { forgottPasswordValidation } from './validation'
import customAxios from '../../store/customAxios';
import { USER_FORGOTTEN_PASSWORD } from './userUtils';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
function ForgotPassword() {

    const [showPassword , setShowPassword] = useState()
    const [errors,setErrors] = useState({})
    const navigate = useNavigate();

    const [ForgotPasswordRequest , setForgotPasswordRequest] = useState({
        token:'',
        newPassword:''
    })

    const [formData ,setFormData]=useState({
        newPassword:'',
        confirmPassword:''
    })


    // for extracting the token from the url START
    const [searchParams] = useSearchParams()
    const emailToken  = searchParams.get('token');
    console.log(emailToken + 'token got')
    // for extracting the token from the url END


    const handleClickShowPassword = () =>{
        setShowPassword(!showPassword);
      }

      const handleValidation =()=>{
        const errors = forgottPasswordValidation(formData);
        setErrors(errors);
        return Object.keys(errors).length === 0;
      }



    const handleInputChange =(e)=>{
        setFormData({...formData ,[e.target.name]:e.target.value})
        console.log(formData , 'form handleinputchange')
    }

    const handleSubmition= async(e)=>{
        e.preventDefault();
        if(!handleValidation()){
            toast.error("Enter valid data");
            console.log(formData)
            return;
        }

        setForgotPasswordRequest({
            token:emailToken,
            newPassword:formData.newPassword
        })

        try {
            const response = await customAxios.post(USER_FORGOTTEN_PASSWORD , ForgotPasswordRequest);
            console.log(response);
        } catch (error) {
            console.log(error)
        }

    }


  return (
    <div className='profile-container'>
    <p className='text-xl font-semibold underline my-3 text-blue-800'>Change password Settings</p>
    <div className='w-2/4 flex-row'>
      <p className='my-2 '>Change My Password</p>

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
    
    onClick={handleSubmition}

    >Change password</button>
   </div>
    </div>




  </div>
  )
}

export default ForgotPassword