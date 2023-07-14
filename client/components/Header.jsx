import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const Header = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
      <Typography variant="h6" component="div">
        PantryPlanner
      </Typography>
      <div>
        <Button variant="outlined" color="primary" sx={{ marginRight: '8px' }}>
          My Recipes
        </Button>
        <Button variant="outlined" color="primary" sx={{ marginRight: '8px' }}>
          About
        </Button>
        <Button variant="outlined" color="primary">
          Logout
        </Button>
      </div>
    </Box>
  );
};

export default Header;
