import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import React, { useState, useEffect } from 'react';

const Day = ({ day, name, side, vegetable }) => {
  return (
    <Grid item>
      <Box
        sx={{
          border: '1px solid black',
          padding: '10px',
          width: '100px',
          height: '150px',
        }}
      >
        <Box>{day.slice(0, day.length - 1)}:</Box><br></br>
        <Box>{name}</Box>
        <Box>{side}</Box>
        <Box>{vegetable}</Box>
      </Box>
    </Grid>
  );
};

export default Day;
