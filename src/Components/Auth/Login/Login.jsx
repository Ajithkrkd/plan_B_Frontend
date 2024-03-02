import React from 'react'
import LoginForm from './LoginForm'
import { Box, Card, CardContent, Typography } from '@mui/material'

function Login() {
  return (
    <>
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
    <Card sx={{ boxShadow: 2 ,maxWidth: 500, mx:'auto' }}> {/* Add box shadow */}
      <CardContent>
        <Typography variant="h5" component="div" sx={{ mb: 1 , padding:'10px'}}>
          Login
        </Typography>
        <LoginForm /> 
      </CardContent>
    </Card>
  </Box>
    </>
  )
}

export default Login