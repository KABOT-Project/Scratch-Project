import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Signup = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <h1>Signup</h1>
      <TextField label="First Name" sx={{ margin: "10px" }}></TextField>
      <TextField label="Last Name" sx={{ margin: "10px" }}></TextField>
      <TextField label="Email" sx={{ margin: "10px" }}></TextField>
      <TextField label="Password" sx={{ margin: "10px" }}></TextField>
      <Button variant="contained">Signup</Button>
    </Box>
  )
}

export default Signup;