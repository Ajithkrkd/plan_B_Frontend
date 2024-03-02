import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { CardContent, IconButton, InputAdornment } from '@mui/material';
import axios from 'axios'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { validate ,renderError } from '../Validation';
const LoginForm = () => {

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

export default LoginForm;
