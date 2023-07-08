const db = require('../models/models'); 

const recipeController = {};

recipeController.getRecipes = async (req, res, next) => {

    // const userID = req.session.user_id; // change in the query as well

    try {
        const query = `SELECT recipe_id, recipe_name, recipe_type FROM recipes JOIN users ON recipes.user_id = users.user_id WHERE users.user_id = 1;`; 
        const result = await db.query(query);
        console.log(result.rows);
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
        // const promises = res.locals.data.map(async (recipe) => {
        //     const result = await db.query(`SELECT ingredients_id, ingredient_name, amount, unit FROM ingredients JOIN recipes ON ingredients.recipe_id = recipes.recipe_id WHERE recipes.recipe_id = ${recipe.recipe_id};`);
        //     recipe.ingredientList = result.rows;
        // });

        // await Promise.all(promises);
        for (let i = 0 ; i < res.locals.data.length; i++){
            const result = await db.query(`SELECT ingredients_id, ingredient_name, amount, unit FROM ingredients JOIN recipes ON ingredients.recipe_id = recipes.recipe_id WHERE recipes.recipe_id = ${res.locals.data[i].recipe_id};`);
            res.locals.data[i].ingredientList = result.rows; 
        };
        console.log(res.locals.data);
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
        const { recipe_name, recipe_type, ingredientList } = req.body;
        const input = { recipe_name, recipe_type, ingredientList };
        const ingredients = input.ingredientList; 

        console.log(input);

        const recipeQuery = `INSERT INTO recipes (recipe_name, recipe_type, user_id) VALUES ('${input.recipe_name}', '${input.recipe_type}', 1) RETURNING *;`;
        const recipeResult = await db.query(recipeQuery)
        const recipeID = recipeResult.rows[0].recipe_id;
        res.locals.data = recipeResult.rows[0];
        res.locals.data.ingredientList = [];

        for (let i = 0; i < ingredients.length; i++){
            const ingredientResult = await db.query(`INSERT INTO ingredients (ingredient_name, amount, unit, recipe_id) VALUES ('${ingredients[i].ingredient_name}', '${ingredients[i].amount}', '${ingredients[i].unit}', ${recipeID}) RETURNING *;`);
            console.log(ingredientResult);
            res.locals.data.ingredientList.push(ingredientResult.rows[0]);
        }
        
        console.log(res.locals.data);
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