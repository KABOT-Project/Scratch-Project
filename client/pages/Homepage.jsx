import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import Week from '../components/Week';
import Grocerylist from '../components/Grocerylist';
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
const axios = require('axios');
import "../stylesheet.css"
import { set } from 'mongoose';

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

  const fetchData = async () => {
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
          // if (data.data){
          setWeek(data.data);
          setGroceryList(data.groceryList);
          setWeekNum(0);
          setWeekInput({Monday: false, Tuesday: false, Wednesday: false, Thursday: false, Friday: false, Saturday: false, Sunday: false})
          // } else {
          //   setDataAvailable(false);
          // }

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

  return (
    <div>
      <Header />
      <div className="homepage-container">
        <h1 className="homepage-title">Homepage</h1>
        <Box className="form-container">
          <div className="checkbox-group">
            <label htmlFor="checkbox1">
              <input type="checkbox" id="checkbox1" name="Monday" onChange={handleWeekInputChange} />
              Monday
            </label>
            <label htmlFor="checkbox2">
              <input type="checkbox" id="checkbox2" name="Tuesday" onChange={handleWeekInputChange} />
              Tuesday
            </label>
            <label htmlFor="checkbox3">
              <input type="checkbox" id="checkbox3" name="Wednesday" onChange={handleWeekInputChange} />
              Wednesday
            </label>
            <label htmlFor="checkbox4">
              <input type="checkbox" id="checkbox4" name="Thursday" onChange={handleWeekInputChange} />
              Thursday
            </label>
            <label htmlFor="checkbox5">
              <input type="checkbox" id="checkbox5" name="Friday" onChange={handleWeekInputChange} />
              Friday
            </label>
            <label htmlFor="checkbox6">
              <input type="checkbox" id="checkbox6" name="Saturday" onChange={handleWeekInputChange} />
              Saturday
            </label>
            <label htmlFor="checkbox7">
              <input type="checkbox" id="checkbox7" name="Sunday" onChange={handleWeekInputChange} />
              Sunday
            </label>
          </div>
          <div className="weeks-input">
            <p>How many weeks would you like to generate?</p>
            <TextField max="99" type="number" onChange={handleWeekNumChange} />
          </div>
          <Button style={{ fontSize: '30px' }} variant="contained" sx={{color: 'rgb(191, 186, 186)', backgroundColor: 'rgba(36, 57, 60, 0.73)'}} onClick={generationButtonClick}>
            Generate
          </Button>
        </Box>
        <div className="calendar-container">
          <h1 className="calendar-title">Calendar</h1>
          {dataAvailable ? (
            Object.entries(week).map(([property, value], index) => (
              <Week week={value} key={index} num={index} />
            ))
          ) : (
            <p>You have not scheduled your weeks yet. Please press generate to schedule your meals!</p>
          )}
        </div>
        <div className="grocery-list-container">
          <h1 className="grocery-list-title">Grocery List</h1>
          <Grocerylist groceryList={groceryList} />
        </div>
      </div>
    </div>
  );
};

export default Homepage;