import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { CardContent, IconButton, InputAdornment } from '@mui/material';
import axios from 'axios'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { validate ,renderError } from '../Validation';
import {AUTH_LOGIN_URL} from '../authUtils'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';



const LoginForm = () => {


    const navigate = useNavigate();
    const [errors,setErrors]=useState({});
    const [showPassword , setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    //show password button
    const handleClickShowPassword =()=>{
        setShowPassword(!showPassword);
    }

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  //handle validation error message -------------->
  const handleValidation = () =>{
      const errors = validate(formData);
      setErrors(errors);
      return Object.keys(errors).length === 0; 
    }
 //handle validation error message -------------->

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!handleValidation()){
      console.log("verification failed")
        return;
    }
    try {
      const response = await axios.post(
        AUTH_LOGIN_URL,
        formData
      );
      console.log('Form submitted:', response.data);
      localStorage.setItem('accessToken' , response.data.access_token);
      localStorage.setItem('accessToken' , response.data.refresh_token);
    } catch (error) {
      toast.error(error.response.data.message);
      console.error('Error submitting form:', error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
     <CardContent>
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
      <button onClick={()=>{handleSubmit}} class="button --shine">Login</button>
      </CardContent>
      <p onClick={()=>{navigate('/register')}} style={{ color: 'blue' }}>
       create new account?
      </p>
    </form>
  );
};

export default LoginForm;
