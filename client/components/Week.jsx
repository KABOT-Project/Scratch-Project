import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Day from '../components/Day';

const Week = ({ week, num }) => {

  return (
    <div>
      <h1>Week {num + 1}</h1>
      <Grid container spacing={2}>
        {Object.entries(week).map(([property, value], index) => (
          <Grid item xs={12} sm={7} md={2} lg={1} key={property}>
            <Day
              day={property}
              name={value.recipe_name}
              side={value.side ? value.side.recipe_name : null}
              vegetable={value.vegtable ? value.vegtable.recipe_name : null}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Week;

