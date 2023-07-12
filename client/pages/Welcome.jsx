import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

const Welcome = () => {

  const navigate = useNavigate(); 
  
  const handleLoginClick = () => {
    navigate('/login');
  }

  const handleSignupClick = () => {
    navigate('/signup');
  }

//code below is sending a post request to the backend in order to authorize the user; their code is sent over, and exchanged for a token
//conditionals? 
const login = useGoogleLogin({
  flow: 'auth-code',
  onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      const tokens = await axios.post(
          'http://localhost:3000/auth/google', {
              code: codeResponse.code,
          });
      // console.log(tokens);
      //verify token 
      //grab info from id token; email, given_name, family_name
      const idToken = tokens.data.id_token;
      const decodedToken = jwt_decode(idToken);
      //send user to a google auth page? 
      //if email exists in the database, send to a route that will redirect to a page. 
      //if email does NOT exist in the database, 
      console.log(decodedToken);
      console.log(decodedToken.email);
      console.log(decodedToken.given_name);
      console.log(decodedToken.family_name);
      //conditional - does this email already exist in the database? does the password need to be stored? 
      //users database -> username, password, first_name, last_name, email; 
      //check the emails -> if the email already is in use, redirect? if username/email does not exist -> create an account in the database
  },
  onError: errorResponse => console.log(errorResponse),
});

  return (
    <div>
    <Box>
      <h1>Welcome to the Jungle!!!</h1>
      <Button variant="contained" onClick = {handleLoginClick}>Login</Button>
      <Button variant="contained" onClick = {handleSignupClick}>Signup</Button>
    </Box>
    <Button onClick={() => login()}>
      Sign in with Google 🚀
      </Button>
    </div>
  )
}

export default Welcome;