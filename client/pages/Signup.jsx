import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';

const Signup = () => {

  const [credentials, setCredentials] = useState({ username: '', password: '', first_name: '', last_name: '', email: ''});

  // update credentials when textfield is edited
  const handleChange = (e) => {
    setCredentials((credentials) => ({
      ...credentials,
      [e.target.name]: e.target.value,
    }));
  };
  
  // submit data when Signup button clicked
  const signupSubmit = (e) => {
    e.preventDefault();
    
    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer your_token_here',
      },
      body: JSON.stringify(credentials),
    })
      .then(response => {
        if (response.ok){
          console.log(response);
          window.location.href = '/homepage';
        }
      })
      .catch(error => {
        if (error) console.log(error);
      })
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <h1>Signup</h1>
      <TextField name='first_name' label="First Name" sx={{ margin: "10px" }} value={credentials.first_name} onChange={handleChange}></TextField>
      <TextField name='last_name' label="Last Name" sx={{ margin: "10px" }} value={credentials.last_name} onChange={handleChange}></TextField>
      <TextField name='email' label="Email" sx={{ margin: "10px" }} value={credentials.email} onChange={handleChange}></TextField>
      <TextField name='username' label="Username" sx={{ margin: "10px" }} value={credentials.username} onChange={handleChange}></TextField>
      <TextField type='password' name='password' label="Password" sx={{ margin: "10px" }} value={credentials.password} onChange={handleChange}></TextField>
      <Button onClick={signupSubmit} variant="contained">Signup</Button>
    </Box>
  )
}

export default Signup;