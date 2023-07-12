import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



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
