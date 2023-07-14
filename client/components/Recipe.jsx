import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const Recipe = ({ name, ingredients }) => {
  // hook to handle conditional rendering of ingredients
  const [showIngredients, setShowIngredients] = useState(false);

  // function that will toggle conditional rendering of ingredients
  const toggleIngredients = () => {
    setShowIngredients(!showIngredients);
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <h2>{name}</h2>
      <Box>
        {showIngredients && ingredients.map((ingredient) => (
          <h4>{`${ingredient.amount} ${ingredient.unit} of ${ingredient.ingredient_name}`}</h4>
        ))}
      </Box>
      <Button variant="outlined" onClick={toggleIngredients}>
        {showIngredients ? 'Hide Ingredients' : 'Show Ingredients'}
      </Button>
    </Box>
  );
};

export default Recipe;