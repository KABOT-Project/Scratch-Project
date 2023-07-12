import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import Week from '../components/Week';
import Grocerylist from '../components/Grocerylist';
import { useNavigate } from "react-router-dom";
const axios = require('axios');

const Homepage = () => {

  const [groceryList, setGroceryList] = useState([]);


  // render data on page load if user already generated a week
  // *** need to add conditional if user has not generated something ***
    // component that renders something to the effect of "nothing generated yet" inplace of week and grocery list components
  useEffect(() => {
    fetch('/api/homepage', {
      method: 'GET',
      headers: {
        credentials: 'same-origin'
      }
    })
      .then(response => {
        console.log(response); 
        return response.json(); 
      })
      .then(data => {
        console.log('this is the reduced data', data.reducedData);
        setGroceryList(data.reducedData);
      })
      .catch(error => {
        console.log('Error occurred while fetching user data:', error);
      });
    
  }, []);

  const navigate = useNavigate();

  const logout = async () => {
    await axios
       .get("http://localhost:3000/api/logout")
       .then((response) => {
        console.log(response);
        navigate("/");
       })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <h1>Homepage</h1>
      <Button variant="outlined" onClick={logout}>Logout</Button>
      <Box>
        <input type="checkbox" id="checkbox1" name="checkbox1"></input>
        <label for="checkbox1">Monday</label>
        <input type="checkbox" id="checkbox2" name="checkbox2"></input>
        <label for="checkbox2">Tuesday</label>
        <input type="checkbox" id="checkbox3" name="checkbox3"></input>
        <label for="checkbox3">Wednesday</label>
        <input type="checkbox" id="checkbox4" name="checkbox4"></input>
        <label for="checkbox4">Thursday</label>
        <input type="checkbox" id="checkbox5" name="checkbox5"></input>
        <label for="checkbox5">Friday</label>
        <input type="checkbox" id="checkbox6" name="checkbox6"></input>
        <label for="checkbox6">Saturday</label>
        <input type="checkbox" id="checkbox7" name="checkbox7"></input>
        <label for="checkbox7">Sunday</label><br></br>
        <p>How many weeks would you like to generate?</p>
        <TextField type="number" sx={{ margin: "10px" }}></TextField><br></br>
        <Button variant="contained">Generate</Button>
      </Box>
      <Box>
        <h1>Calendar</h1>
      </Box>
      <Box>
        <h1>Grocery List</h1>
        {groceryList.map((grocery, index) => (
          <Grocerylist key={index} name={grocery.ingredient_name} />
        ))}
      </Box>
      
    </div>
  )
}

export default Homepage;