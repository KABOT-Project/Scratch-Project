import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';



//google oauth
// const handleToken = () => {
//   const id_token = googleUser.getAuthResponse().id_token;
//   console.log("handleToken invoked");
//   axios.post('https://localhost:3000/api/tokensignin', 'idtoken=' + id_token, {
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded'
//   }
// })
//   .then(response => {
//     console.log('Signed in as: ' + response.data);
//   })
//   .catch(error => {
//     console.error('Error while signing in:', error);
//   });
// }

const Login = () => {

const [credentials, setCredentials] = useState({ username: '', password: ''});

// update credentials when textfield is edited
const handleChange = (e) => {
  setCredentials((credentials) => ({
    ...credentials,
    [e.target.name]: e.target.value,
  }));
};

// submit data when Login button clicked
const loginSubmit = (e) => {
  e.preventDefault();
  // console.log(credentials);
  
  fetch('/api/login', {
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
      <h1>Login</h1>
      <TextField name='username' label="Username" sx={{ margin: "10px" }} value={credentials.username} onChange={handleChange}></TextField>
      <TextField type='password' name='password' label="Password" sx={{ margin: "10px" }} value={credentials.password} onChange={handleChange}></TextField>
      <Button onClick={loginSubmit} variant="contained">Login</Button>
      
    </Box>
  )
}

export default Login;
