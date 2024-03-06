import React, { useEffect } from 'react'
import LoginForm from './LoginForm'
import { Box, Card, CardContent, Typography } from '@mui/material'
import axios from 'axios';
import { AUTH_CONFIRM_EMAIL } from '../authUtils';
import { useSearchParams,useNavigate} from 'react-router-dom';
import BasicModalDialog from '../../User/BasicModalDialog';
function Login() {



const navigate = useNavigate();

// for extracting the token from the url START
const [searchParams] = useSearchParams()
const emailToken  = searchParams.get('token');
console.log(emailToken + 'token got')
// for extracting the token from the url END


  useEffect(()=>{
    checkUserEmailVerified(emailToken);
  },[emailToken])

  const checkUserEmailVerified = async (emailToken)=>{
    try {
      
      const response = await axios.post(AUTH_CONFIRM_EMAIL + '/' + emailToken);
      console.log(response)
      if(response.data.status === 200){
        navigate('/login')
      }
    } catch (error) {
      console.log(error.response.data)
      console.log("error close")
    }
  }

  return (
    <>
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
    <Card sx={{ boxShadow: 2 ,maxWidth: 500, mx:'auto' }}> {/* Add box shadow */}
      <CardContent>
        <Typography variant="h5" component="div" sx={{ mb: 1 , padding:'10px'}}>
          Login
        </Typography>
        <LoginForm /> 
        <BasicModalDialog/>
      </CardContent>
    </Card>
  </Box>
    </>
  )
}

export default Login