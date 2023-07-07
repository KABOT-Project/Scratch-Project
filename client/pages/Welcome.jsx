import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  
  const navigate = useNavigate(); 
  
  const handleLoginClick = () => {
    navigate('/login');
  }

  const handleSignupClick = () => {
    navigate('/signup');
  }

  return (
    <Box>
      <h1>Welcome to the Jungle!!!</h1>
      <Button variant="contained" onClick = {handleLoginClick}>Login</Button>
      <Button variant="contained" onClick = {handleSignupClick}>Signup</Button>
    </Box>
  )
}

export default Welcome;