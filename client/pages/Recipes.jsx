import React, { useState, useEffect } from 'react';
import Recipe from '../components/Recipe.jsx';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const Recipes = () => {
  // hook for rendering user recipes
  const [recipes, getRecipes] = useState([]);

  useEffect(() => {
    let response = ['Pasta', 'Burger', 'Ice Cream', 'Seafood'];
    getRecipes(response);
  }, []);

  return ( 
    <Box>
      <div>
        <h1>Recipes</h1>
          {recipes.map((recipe, index) => (
            <Recipe key={index} name={recipe} />
          ))}
      </div>

      <div>
        <h1>Add a New Recipe</h1>

        <Button variant="contained">Create Recipe</Button>



      </div>
    </Box>
  );
}

export default Recipes;

// Query the DB for users existing recipes - get this back in an array
// map each recipe to a Recipe component, render each component on the page