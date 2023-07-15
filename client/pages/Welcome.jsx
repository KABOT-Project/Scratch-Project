import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import personkitchen from '../assets/personkitchen.jpg'
import sadperson from '../assets/sad.jpg'
import sadpersontwo from '../assets/sad2.jpg'
import picturetwo from '../assets/dkpic.jpg'
import "../stylesheet.css"


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
      // res.locals.decodedToken = decodedToken; 
      // console.log(res.locals.decodedToken);

      await axios
        .post('http://localhost:3000/api/googauth/', {decodedToken})
        .then(response => {
          console.log(response);
          window.location.href = '/homepage';
        })
        .catch((err) => console.log(err));
      //send user to a google auth page? 
      //if email exists in the database, send to a route that will redirect to a page. 
      //if email does NOT exist in the database, 
      // console.log(decodedToken);
      // console.log(decodedToken.email);
      // console.log(decodedToken.given_name);
      // console.log(decodedToken.family_name);
      //conditional - does this email already exist in the database? does the password need to be stored? 
      //users database -> username, password, first_name, last_name, email; 
      //check the emails -> if the email already is in use, redirect? if username/email does not exist -> create an account in the database
  },
  onError: errorResponse => console.log(errorResponse),
});

  useEffect(() => {
    document.body.classList.add('welcome-body');
    return () => {
      document.body.classList.remove('welcome-body');
    };
  }, []);

  return (
    <section className = "grid-container">
      <div class="picture1">
      <div className="gradient-overlay" />
        <img id="personkitchen" src = {personkitchen} alt="Person in kitchen"/>
      </div>
      <div className = "bigLandingText">Pantry Plan</div>
      <div className = "smallLandingText">For when creating grocery lists is your lowest priority.</div>
      <div class="testimonials">User Testimonials</div>
      <div class="picture2">
        <img id="picture2id" src = {picturetwo} alt="DK Pic"></img>
      </div>
      <div class="quote2">"The time saved using Pantry Plan allows me to focus on my true passions in life - skincare."</div>
      <div class="picture3">
        <img id="sadperson" src = {sadperson} alt="Sad person in kitchen"></img></div>
      <div class="quote3">"After two back to back approach lectures, I'm exhausted. Pantry Plan allows me to put my energy where it's deserved."</div>
      <div class="picture4"><img id="sadpersontwo" src = {sadpersontwo} alt="Second person in kitchen"></img></div>
      <div class="quote4">"I thought UberEats was less of a lift than shopping then cooking - until Pantry Pan. In my fridge, meal prep containers have replaced week old fried rice. Thanks Pantry Plan!"</div>
      <div class="loginbutton"><Button variant="contained" onClick = {handleLoginClick}>Login</Button></div>
      <div class="signupbutton"><Button variant="contained" onClick = {handleSignupClick}>Signup</Button></div>
      <div class="googlebutton"><Button onClick={() => login()}>Sign in with Google 🚀</Button></div>
    </section>
  )
}

export default Welcome;

{/* <Box>
<h1>Welcome to the Jungle!!!</h1>
<Button variant="contained" onClick = {handleLoginClick}>Login</Button>
<Button variant="contained" onClick = {handleSignupClick}>Signup</Button>
</Box>
<Button onClick={() => login()}>
Sign in with Google 🚀
</Button> */}

     {/* <div className = "image-wrapper"> 
      </div>
      <div className = "landingTextContainer">
        <div className = "bigLandingText">Pantry Plan</div>
        <div className = "smallLandingText">When creating grocery lists is your lowest priority.</div>
      </div>
      <div className = "quotesContainer">
        <p id = "quote1">"I just don't want to exercise any mental energy in figuring out what to buy after two back to back approach lectures. Pantry Plan allows me to put my energy where it's deserved." 
        <br></br> 
        <br></br>
        Thomas Pappas </p>
        <div id = "quote2">"Pantry Plan saved my marriage." 
        <br></br>
        <br></br>
        Bruce Onuigbo</div>
        <br></br>
        <br></br>
        Davis Kim </div>
      </div>
      <Button variant="contained" onClick = {handleLoginClick}>Login</Button>
      <Button variant="contained" onClick = {handleSignupClick}>Signup</Button>
      <Button onClick={() => login()}>Sign in with Google 🚀</Button> */}