const db = require('../models/models'); 

const recipeController = {};

// test data template

// {
//     "recipe_name": "test10",
//     "recipe_type": "Main Dish",
//     "ingredientList": [{"ingredient_name": "test10", "amount": "test10", "unit": "test10"},
//     {"ingredient_name": "test10", "amount": "test10", "unit": "test10"}]
// }


recipeController.getRecipes = async (req, res, next) => {

    const userID = req.session.user_id; 
    console.log(userID);

    try {
        // query all recipes associated with the signed in user 
        const query = `SELECT recipe_id, recipe_name, recipe_type FROM recipes JOIN users ON recipes.user_id = users.user_id WHERE users.user_id = ${userID};`; 
        const result = await db.query(query);
        // data to be passed on to next middleware to obtain associated ingredients
        res.locals.data = result.rows;
        return next();
    }

    catch (error) {
        console.log(error);
        return next({
            log: error,
            status: 400,
            message: {error: 'Error occurred in recipeController.getRecipes middleware'}
        })
    }
};

recipeController.getIngredients = async (req, res, next) => {

    try {
        // the return value from the recipe query returns an array of recipes 
        for (let i = 0 ; i < res.locals.data.length; i++){
            // query every ingredient for each recipe in the array
            const result = await db.query(`SELECT ingredients_id, ingredient_name, amount, unit FROM ingredients JOIN recipes ON ingredients.recipe_id = recipes.recipe_id WHERE recipes.recipe_id = ${res.locals.data[i].recipe_id};`);
            // add the returned rows to the relative recipe it is associated with
            res.locals.data[i].ingredientList = result.rows; 
        };

        return next();
    }
    catch (error) {
        return next({
            log: error,
            status: 400,
            message: {error: 'Error occurred in recipeController.getIngredients middleware'}
        })
    }
};

recipeController.postRecipe = async (req, res, next) => {

    try { 
        // deconstruct request body
        const { recipe_name, recipe_type, ingredientList } = req.body;
        const input = { recipe_name, recipe_type, ingredientList };
        const ingredients = input.ingredientList; 

        // add the recipe to the recipe table
        const recipeQuery = `INSERT INTO recipes (recipe_name, recipe_type, user_id) VALUES ('${input.recipe_name}', '${input.recipe_type}', ${req.session.user_id}) RETURNING *;`;
        const recipeResult = await db.query(recipeQuery)
        // to ensure the recipe is related to the the row postings in the ingredient table 
        const recipeID = recipeResult.rows[0].recipe_id;

        // add the recipe information to the response object to be able to render recipe information
        res.locals.data = recipeResult.rows[0];
        res.locals.data.ingredientList = [];

        // add each ingredient to the ingredient table
        for (let i = 0; i < ingredients.length; i++){
            const ingredientResult = await db.query(`INSERT INTO ingredients (ingredient_name, amount, unit, recipe_id) VALUES ('${ingredients[i].ingredient_name}', '${ingredients[i].amount}', '${ingredients[i].unit}', ${recipeID}) RETURNING *;`);
            // add the ingredients information to the response object to be able to render ingredient information
            res.locals.data.ingredientList.push(ingredientResult.rows[0]);
        };

        return next();
    }
    catch (error) {
        return next({
            log: error,
            status: 400,
            message: {error: 'Error occurred in recipeController.postRecipe middleware'}
        })
    }
};

module.exports = recipeController;