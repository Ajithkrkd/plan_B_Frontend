import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { CardContent ,IconButton, InputAdornment } from '@mui/material';
import axios from 'axios'
import {validate ,renderError} from '../Validation.jsx'
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Form = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber:'',
        email: '',
        password: '',
    });
    
  const [errors, setErrors] = useState({}); 
  const [showPassword, setShowPassword] = useState(false)  

//show password button
const handleClickShowPassword =()=>{
    setShowPassword(!showPassword);
}


  const handleValidation = () =>{
    const errors = validate(formData);
    setErrors(errors);
    return Object.keys(errors).length === 0; 
  }

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!handleValidation()){
        return;
    }
    try {
      const response = await axios.post(
        'https://your-api-endpoint.com/register',
        formData
      );
      console.log('Form submitted:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

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
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
      </CardContent>
    </form>
  );
};

export default Form;
