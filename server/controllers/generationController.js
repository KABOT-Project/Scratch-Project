const db = require('../models/models'); 

const generationController = {};

generationController.getRecipes = async (req, res, next) => {

    const userID = req.session.user_id; 

    try {
        // query all recipes associated with the signed in user 
        const query = `SELECT recipe_id, recipe_name, recipe_type FROM recipes JOIN users ON recipes.user_id = users.user_id WHERE users.user_id = 1;`; //${userID};`; 
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

generationController.getIngredients = async (req, res, next) => {

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

// test data template 

// {
//     "weekDays" : {
//         "Monday": "True",
//         "Tuesday": "True",
//         "Wednesday": "True",
//         "Thursday": "True",
//         "Friday": "True",
//         "Saturday": "True",
//         "Sunday": "True"
//     },
//     "weeks": 2
// }

generationController.handleUserData = (req, res, next) => {
    try {

        // deconstruct the request body
        const { weekDays, weeks } = req.body;
        const input = { weekDays, weeks };
        // count the total number of days
        let count = 0;
        for (const key in input.weekDays){
            if (input.weekDays[key]){
                count += 1
            };
        };
        count *= input.weeks;

        // filter the raw data for meal type
        let mainMeals = res.locals.data.filter(obj => obj.recipe_type === 'Main Dish' || obj.recipe_type === 'Full Meal');
        const copyMainMeals = mainMeals.slice();
        let vegtables = res.locals.data.filter(obj=> obj.recipe_type === 'Vegtable');
        const copyVegtables = vegtables.slice();
        let sides = res.locals.data.filter(obj=> obj.recipe_type === 'Side');
        const copySides = sides.slice();

        // declare a return array that will contain the randomized meals
        const meals = [];

        // *** add the ingredient list for anything this loop touches to be appended to a grocery list array ***

        // randomizes meals and adds sides to main dishes 
        for (let l = count; l >= 0; l--){
            let i = mainMeals.length;
            let randomNum = Math.floor(Math.random() * i);
            if (mainMeals[randomNum].recipe_type === 'Main Dish'){
                for (let j = vegtables.length - 1; j >= 0; j--){
                    let vegtablesRandomNum = Math.floor(Math.random() * j);
                    mainMeals[randomNum].vegtable = vegtables.splice(vegtablesRandomNum, 1)[0];
                    if (vegtables.length === 0){
                        vegtables = copyVegtables;
                    };
                    break
                };
                for (let k = sides.length - 1; k >= 0; k--){
                    let sidesRandomNum = Math.floor(Math.random() * k);
                    mainMeals[randomNum].side = sides.splice(sidesRandomNum, 1)[0];
                    if (sides.length === 0){
                        sides = copySides;
                    };
                    break
                };
            }
            // *** need to add functionality of not repeating a recent meal and populating all the days if there are not enough meals ***
            meals.push(mainMeals.splice(randomNum, 1)[0]);
            if (mainMeals.length === 0){
                mainMeals = copyMainMeals;
            }
        };

        // declare a response object to be returned to the frontend and organize data in a workable format
        const responseObj = {};

        // construct the skeleton of the response object
        for (let i = input.weeks; i > 0; i--){
            let temp = `week ${i}`;
            responseObj[temp] = {};
            for (const key in weekDays){
                let day = `${key}${i}`
                responseObj[temp][day] = weekDays[key];
            };
        };

        // add randomized meals to the response object
        for (const key1 in responseObj){
            for (const key2 in responseObj[key1]){
                if (responseObj[key1][key2]){
                    const meal = meals.pop();
                    responseObj[key1][key2] = meal;
                };
            };
        };

        // console.log(responseObj);
        res.locals.data = responseObj;

        // *** grocery list generation goes here to be added to res.locals.groceryList ***

        return next();
    }
    catch (error) {
        return next({
            log: error,
            status: 400,
            message: {error: 'Error occurred in generationController.handleUserData middleware'}
        })
    }
};

module.exports = generationController;