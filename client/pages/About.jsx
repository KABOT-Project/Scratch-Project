import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import Week from '../components/Week';
import Grocerylist from '../components/Grocerylist';
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import Typography from '@mui/material/Typography';

const axios = require('axios');

const About = () => {

    return (
        <div>
            <Header></Header>
            <Typography variant="h4" component="h1" gutterBottom>
        About PantryPlanner
      </Typography>
      <Typography variant="body1" paragraph>
        PantryPlanner is a recipe scheduling application designed to help you organize your meals and plan your weekly
        menu. With PantryPlanner, you can easily manage your recipe collection and generate meal schedules based on your
        preferences.
      </Typography>
      <Typography variant="body1" paragraph>
        Features of PantryPlanner:
        <ul>
          <li>Recipe Management: Store and manage your favorite recipes in one place.</li>
          <li>Recipe Rendering: View your recipes on the dedicated "Recipes" page.</li>
          <li>Meal Schedule Generation: Generate weekly meal schedules based on your desired number of weeks and specific
            weekdays.</li>
          <li>Random Recipe Selection: PantryPlanner can suggest random recipes from your collection for each scheduled
            meal.</li>
        </ul>
      </Typography>
      <Typography variant="body1" paragraph>
        Whether you are a seasoned cook or just starting out, PantryPlanner is here to make your meal planning easier and
        more enjoyable. Say goodbye to the stress of deciding what to cook each day and let PantryPlanner take care of
        it for you!
      </Typography>
      <Typography variant="body1">
        Thank you for choosing PantryPlanner to simplify your meal planning. We hope you find it useful and that it helps
        you discover new delicious recipes!
      </Typography>
        </div>
    );
}

export default About;