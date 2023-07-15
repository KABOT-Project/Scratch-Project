import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {

  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/logout');
      console.log(response);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleRecipeNavigation = () => {
    window.location.href = '/recipes';
  };

  const handleHomepageNavigation = () => {
    window.location.href = '/homepage'
  };

  const handleAboutNavigation = () => {
    window.location.href = '/about';
  };

  return (
    <Box className="header-container" color="rgb(191, 186, 186)">
      <button className="logo-button" onClick={handleHomepageNavigation}>
        <Typography className="logo" variant="h3" component="div">
          PantryPlanner
        </Typography>
      </button>
      <div className="navigation-buttons">
        <Button sx={{color: 'rgb(191, 186, 186)', backgroundColor: 'rgba(36, 57, 60, 0.73)'}} variant="outlined" color="primary" onClick={handleRecipeNavigation}>
          My Recipes
        </Button>
        <Button variant="outlined" color="primary" onClick={handleAboutNavigation}>
          About
        </Button>
        <Button variant="outlined" color="primary" onClick={logout}>
          Logout
        </Button>
      </div>
    </Box>
  );
};

export default Header;

