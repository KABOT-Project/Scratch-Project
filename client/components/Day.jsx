import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import React, { useState, useEffect } from 'react';

const Day = ({ day, name, side, vegetable }) => {
  return (
    <Grid item xs={1}>
      <Box 
        sx={{
          border: '0px solid #333',
          padding: '10px',
          width: '140px',
          height: '200px',
          borderRadius: '8px',
          backgroundColor: 'rgba(88, 103, 105, 0.73)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          // justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            fontSize: '18px',
            fontWeight: 'bold',
            margin: '10px',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
          }}
        >
          {day.slice(0, day.length - 1)}
        </Box>
        <Box sx={{ fontSize: '16px', marginBottom: '8px', color: '#FFFFFF', fontWeight: 'bold' }}>{name}</Box>
        <Box sx={{ fontSize: '14px', marginBottom: '4px', color: '#FFFFFF' }}>
          {side ? `Side: ${side}` : null}
        </Box>
        <Box sx={{ fontSize: '14px', marginBottom: '4px', color: '#FFFFFF' }}>
          {vegetable ? `Veg: ${vegetable}` : null}
        </Box>
      </Box>
    </Grid>
  );
};

export default Day;


