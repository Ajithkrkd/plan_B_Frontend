import React, { useEffect} from 'react'
import LoginForm from './LoginForm'
import { Box, Card, CardContent, Typography } from '@mui/material'
import { useSearchParams,useNavigate} from 'react-router-dom';
import BasicModalDialog from '../../User/BasicModalDialog';
import toast from 'react-hot-toast';
import { confirmEmail, getUserDetails } from '../../../Api/User';
import Loader from '../../../common/Loader';


function Login() {



const navigate = useNavigate();

// for extracting the token from the url START
const [searchParams] = useSearchParams()
const emailToken  = searchParams.get('token');
console.log(emailToken + 'token got')



  useEffect(()=>{
    checkUserEmailVerified(emailToken);
  },[emailToken])


  const checkUserEmailVerified = async (emailToken)=>{
    try {
      
      const response = await confirmEmail(emailToken);
      console.log(response)
      if(response.data.status === 200){
        navigate('/login')
        toast.success('Email verified successfully')
      }
    } catch (error) {
      console.log(error.response.data)
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