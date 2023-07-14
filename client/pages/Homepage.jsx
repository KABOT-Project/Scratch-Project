import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import Week from '../components/Week';
import Grocerylist from '../components/Grocerylist';
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
const axios = require('axios');

const Homepage = () => {

  const [groceryList, setGroceryList] = useState([]);

  const [week, setWeek] = useState({});

  const [weekDays, setWeekInput] = useState({Monday: false, Tuesday: false, Wednesday: false, Thursday: false, Friday: false, Saturday: false, Sunday: false});

  const [weeks, setWeekNum] = useState(0);

  const [dataAvailable, setDataAvailable] = useState(false);

  // render data on page load if user already generated a week
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('/api/homepage', {
      method: 'GET',
      headers: {
        credentials: 'same-origin'
      }
    })
      .then(response => {
        return response.json(); 
      })
      .then(data => {
        if (data.responseObj && data.reducedData){
          setDataAvailable(true);
          setWeek(data.responseObj);
          setGroceryList(data.reducedData);
        } else {
          setDataAvailable(false);
          setWeek(week);
          setGroceryList(groceryList);
        }
      })
      .catch(error => {
        console.log('Error occurred while fetching user data:', error);
      });
    }
  
  useEffect(() => {
  }, [week, groceryList])
  

  const handleWeekInputChange = (e) => {
    const { name, checked } = e.target;
    setWeekInput(prevWeekInput => ({
    ...prevWeekInput,
    [name]: checked,
    }));
  };

  const handleWeekNumChange = (e) => {
    const num = e.target.value;
    setWeekNum(num);
  };

  const generationButtonClick = () => {

    const requestObj = {weekDays, weeks}

    fetch('/api/homepage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer your_token_here',
      },
      body: JSON.stringify(requestObj),
      credentials: "include",
    })
      .then(response => {
        if (response.ok) {
          return response.json(); 
        }
        throw new Error('Error in POST request');
      })
      .then(data => {
          setWeek(data.data);
          setGroceryList(data.groceryList);
          setWeekNum(0);
          setWeekInput({Monday: false, Tuesday: false, Wednesday: false, Thursday: false, Friday: false, Saturday: false, Sunday: false})

          const checkboxes = document.querySelectorAll('input[type="checkbox"]');
          checkboxes.forEach((checkbox) => {
          checkbox.checked = false;
        });

          const numberInput = document.querySelector('input[type="number"]');
          numberInput.value = '';
      })
      .catch(error => {
        if (error) console.log(error);
      })
  };


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
      <Header></Header>
      <h1>Homepage</h1>
      <Button variant="outlined" onClick={logout}>Logout</Button>
      <Box>
        <input type="checkbox" id="checkbox1" name="Monday" onChange={handleWeekInputChange}></input>
        <label for="checkbox1">Monday</label>
        <input type="checkbox" id="checkbox2" name="Tuesday" onChange={handleWeekInputChange}></input>
        <label for="checkbox2">Tuesday</label>
        <input type="checkbox" id="checkbox3" name="Wednesday" onChange={handleWeekInputChange}></input>
        <label for="checkbox3">Wednesday</label>
        <input type="checkbox" id="checkbox4" name="Thursday" onChange={handleWeekInputChange}></input>
        <label for="checkbox4">Thursday</label>
        <input type="checkbox" id="checkbox5" name="Friday" onChange={handleWeekInputChange}></input>
        <label for="checkbox5">Friday</label>
        <input type="checkbox" id="checkbox6" name="Saturday" onChange={handleWeekInputChange}></input>
        <label for="checkbox6">Saturday</label>
        <input type="checkbox" id="checkbox7" name="Sunday" onChange={handleWeekInputChange}></input>
        <label for="checkbox7">Sunday</label><br></br>
        <p>How many weeks would you like to generate?</p>
        <TextField type="number" sx={{ margin: "8px" }} onChange={handleWeekNumChange}></TextField><br></br>
        <Button variant="contained" onClick={generationButtonClick}>Generate</Button>
      </Box>
      <Box>
        <h1>Calendar</h1>
        {dataAvailable ? (
          Object.entries(week).map(([property, value], index) => (
            <Week week={value} key={index} num={index} />
          ))
        ) : (
          <p>You have not scheduled your weeks yet. Please press generate to schedule your meals!</p>
        )}
      </Box>
      <Box>
        <h1>Grocery List</h1>
          <Grocerylist groceryList={groceryList} />
      </Box>
      
    </div>
  );
};

export default Homepage;