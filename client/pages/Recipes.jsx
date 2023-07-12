import React, { useState, useEffect } from 'react';
import Recipe from '../components/Recipe.jsx';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const Recipes = () => {
  // hook for rendering user recipes
  const [recipes, getRecipes] = useState([]);

  // hook for add new ingredient inputs
  const [ingredients, addNewIngredient] = useState([]);

  // hook for submitting new recipe to DB
  const [newRecipe, addNewRecipe] = useState({ recipe_name: '', recipe_type: '', ingredientList: [] });

  // update newRecipe state when recipe textfields edited
  const handleRecipeChange = (e) => {
    addNewRecipe((newRecipe) => ({
      ...newRecipe,
    [e.target.name]: e.target.value,
    }));
  };

  const handleIngredientChange = (e, index) => {
    const { name, value } = e.target;
    // const index = e.target.getAttribute("index");
    
    addNewRecipe((newRecipe) => ({
      ...newRecipe,
      ingredientList: newRecipe.ingredientList.map((ingredient, i) =>
        i === index ? { ...ingredient, [name]: value } : ingredient
      ),
    }));
  };

  // // user recipes will be rendered to page when page is loaded
  useEffect(async () => {
    // // dummy data:
    // let response = ['Pasta', 'Burger', 'Ice Cream', 'Seafood'];
    try {
      // GET request to grab current users recipes
      const response = await fetch('/api/recipes', {
        method: 'GET',
        headers: {
          credentials: 'same-origin'
        }
      })
      // convert received data from server from JSON
      const data = await response.json();
      // if response received is okay
      if (response.ok){
        // invoke getRecipes, passing in received JS data. This should render recipes to page
        getRecipes(data);
      }
    // if GET request fails
    } catch (error) {
      // console log error
      console.log(error);
    }
  }, []);

  // function to add new ingredient input
  const handleNewIngredient = () => {
    // add new ingredient input
    addNewIngredient([...ingredients, '']);
    // push new object into ingredientList to match up with text field:
    const newIngredient = { ingredient_name: '', amount: '', unit: '' };
    // pass in current newRecipe state to addNewRecipe
    addNewRecipe((newRecipe) => ({
      ...newRecipe,
      // add newIngredient object to end of ingredientList
      ingredientList: [...newRecipe.ingredientList, newIngredient]
    }));
  }

  // function to submit new recipe to DB
  const handleNewRecipe = () => {
    // take newRecipe object and format into format expected by BE

    // recipe that was added is sent back in response
      // some sort of text saying "X recipe" was added!
      // useEffect to rerender page to show new recipe
    
    const requestData = newRecipe;
  
    fetch('/api/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer your_token_here',
      },
      body: JSON.stringify(requestData),
      credentials: "include",
    })
      .then(response => {
        if (response.ok){
          console.log(response);
        }
      })
      .catch(error => {
        if (error) console.log(error);
      })
    };

  return ( 
    <Box>
  
       
      <Box>
        <h1>Add a New Recipe</h1>
        <form onSubmit={handleNewRecipe}>
          <TextField name='recipe_name' label="Recipe Name" value={newRecipe.recipe_name} sx={{ margin: "10px" }} onChange={handleRecipeChange}></TextField>
          <TextField name='recipe_type' label="Recipe Type" value={newRecipe.recipe_type} sx={{ margin: "10px" }} onChange={handleRecipeChange}></TextField>
          <Button variant="contained" onClick={handleNewIngredient}>Add Ingredient</Button>
          <Button variant="contained" type="submit">Add New Recipe</Button>

          {ingredients.map((ingredient, index) => (
            <Box>
              <TextField name='ingredient_name' index={index} key={`${index}-ingredient`} label="Ingredient Name" value={newRecipe.ingredientList[index].ingredient_name} onChange={(e) => handleIngredientChange(e, index)} sx={{ margin: "10px" }}></TextField>
              <TextField name='amount' index={index} key={`${index}-quantity`} label="Quantity" type="number" value={newRecipe.ingredientList[index].amount} onChange={(e) => handleIngredientChange(e, index)} sx={{ margin: "10px" }}></TextField>
              <TextField name='unit' index ={index} key={`${index}-unit`} label="Unit" value={newRecipe.ingredientList[index].unit} onChange={(e) => handleIngredientChange(e, index)} sx={{ margin: "10px" }}></TextField>
            </Box>
            // <Box>
            //   <TextField key={`${index}-ingredient`} label="Ingredient Name" sx={{ margin: "10px" }}></TextField>
            //   <TextField key={`${index}-quantity`} label="Quantity" sx={{ margin: "10px" }}></TextField>
            //   <TextField key={`${index}-unit`} label="Unit" sx={{ margin: "10px" }}></TextField>
            // </Box>
          ))}
        </form>
      </Box>
      <Box>
        <h1>Recipes</h1>
          {recipes.map((recipe, index) => (
            <Recipe key={index} name={recipe.recipe_name} />
          ))}
      </Box>
    </Box>
  );
}

export default Recipes;

// Query the DB for users existing recipes - get this back in an array
// map each recipe to a Recipe component, render each component on the page