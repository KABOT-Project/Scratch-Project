import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Login = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <h1>Login</h1>
      <TextField label="Email" sx={{ margin: "10px" }}></TextField>
      <TextField label="Password" sx={{ margin: "10px" }}></TextField>
      <Button variant="contained">Login</Button>
    </Box>
  )
}

export default Login;