import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Form from './Form';
function Register() {

    



  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
    <Card sx={{ boxShadow: 2 ,maxWidth: 500, mx:'auto' }}> {/* Add box shadow */}
      <CardContent>
        <Typography variant="h5" component="div" sx={{ mb: 1, padding:'10px'}}>
          Register
        </Typography>
        <Form /> {/* Include your form component here */}
      </CardContent>
    </Card>
  </Box>
  
  )
}

export default Register