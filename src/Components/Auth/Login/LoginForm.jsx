import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { CardContent, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { login } from '../../../Api/User';
import Loader from '../../../common/Loader';
import LazyLoginFormSkeleton from '../../lazySkeltonLoading/LazyLoginFormSkeleton';



const LoginForm = () => {

    const [isLoading , setIsLoding] = useState(false);
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

  const validate =(formData)=>{
    const errors ={};
    if (formData.email.trim() === ''){
      errors.email = 'Email mush not be empty';
    }
    if(formData.password.trim() === ''){
      errors.password = 'Password must not be empty';
    }
  
    return errors;
  }
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
      toast.error('Please enter valid details')
        return;
    };

    try {
      setIsLoding(true);
      const response = await login(formData);
      setIsLoding(false);
      console.log(response)
      localStorage.setItem('accessToken' , response.data.access_token);
      localStorage.setItem('reffreshToken' , response.data.refresh_token);
      navigate('/')
    } catch (error) {
      console.log(error)
      if(error.response.data.message == 'email verification failed'){
        toast.error("Please check your Email ")
        setIsLoding(false);
      }else {
        setIsLoding(false)
        toast.error(error.response.data.message)
      }
    }
  }
  return (
   <>
   {isLoading &&
  <Loader/>}
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
      <p onClick={()=>{navigate('/register')}} style={{ color: 'blue' }} className='text-end'>
       create new account?
      </p>
    </form>

  
  </>
  )
};

export default LoginForm;
