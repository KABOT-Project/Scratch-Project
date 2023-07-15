import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Day from '../components/Day';
import Card from '@mui/material/Card';

const Week = ({ week, num }) => {

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container spacing={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Box sx={{width: '125px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Week {num + 1}</h2>
      </Box>
        {Object.entries(week).map(([property, value], index) => (
          <Card item xs={2} sm={7} md={1} lg={1} key={property} sx={{ margin: '10px' }}>
            <Day
              day={property}
              name={value.recipe_name}
              side={value.side ? value.side.recipe_name : null}
              vegetable={value.vegtable ? value.vegtable.recipe_name : null}
            />
          </Card>
        ))}
      </Grid>
    </Box>
  );
};

export default Week;

