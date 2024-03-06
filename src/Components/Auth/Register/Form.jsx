import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { CardContent ,IconButton, InputAdornment, Link, Typography } from '@mui/material';
import axios from 'axios'
import {validate ,renderError} from '../Validation.jsx'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {AUTH_REGISTER_URL} from '../authUtils.js'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';






const Form = () => {

  const navigate = useNavigate();
  

    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber:'',
        email: '',
        password: '',
    });
    
  const [errors, setErrors] = useState({}); 
  const [showPassword, setShowPassword] = useState(false)  

//show password button START
const handleClickShowPassword =()=>{
  setShowPassword(!showPassword);
}
//show password button END


// for check the form data valid or not START
const handleValidation = () =>{
  const errors = validate(formData);
  setErrors(errors);
  return Object.keys(errors).length === 0; 
}
// for check the form data valid or not END


// when ever user type something in the input this fuction will handle START
const handleChange = (event) => {
  setFormData({ ...formData, [event.target.name]: event.target.value });
};
// when ever user type something in the input this fuction will handle END

//  ASYNC function for making api request START
const handleSubmit = async (event) => {
  event.preventDefault();
  if(!handleValidation()){
    toast.error('verification failed');
    console.log("verification failed")
    return;
  }
  try {
    const response = await axios.post(
      AUTH_REGISTER_URL,
      formData
      );
      if(response.status === 201){
        toast.success("successfully registered")
      }
      console.log('Form submitted:', response.data);
      navigate('/login')
    } catch (error) {
      console.log('hai')
      toast.error(error.response.data.message)
      console.error('Error submitting form:', error);
    }
  };
  //  ASYNC function for making api request END

  return (
    <form onSubmit={handleSubmit}>
     <CardContent>
     <TextField
        label="Full Name"
        variant="standard"
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
        variant="standard"
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
        variant="standard"
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
      <TextField
        label="Password"
        variant="standard"
        name="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
        type={showPassword ? 'text' : 'password'} 
        required
        error={!! errors.password}
        helperText={errors.password}

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
     </CardContent>
      <CardContent style={{display: 'flex' , justifyContent:'flex-end'}}>
      <button onClick={()=>{handleSubmit}} class="button --shine">submit</button>
      </CardContent>
      <p onClick={()=>{navigate('/login')}} style={{ color: 'blue' }}>
        already have an account?
      </p>

    </form>
  );
};

export default Form;
