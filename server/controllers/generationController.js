const db = require('../models/models'); 
const models = require('../models/mongoModels');

const generationController = {};

generationController.getRecipes = async (req, res, next) => {

    const userID = req.session.user_id; 

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
//         "Monday": true,
//         "Tuesday": true,
//         "Wednesday": true,
//         "Thursday": true,
//         "Friday": true,
//         "Saturday": false,
//         "Sunday": false
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

        // filter the raw data for meal type and copy the full data set
        let mainMeals = res.locals.data.filter(obj => obj.recipe_type === 'Main Dish' || obj.recipe_type === 'Full Meal');
        const copyMainMeals = mainMeals.slice();
        let vegtables = res.locals.data.filter(obj=> obj.recipe_type === 'Vegtable');
        const copyVegtables = vegtables.slice();
        let sides = res.locals.data.filter(obj=> obj.recipe_type === 'Side');
        const copySides = sides.slice();

        // declare a return array that will contain the randomized meals and a raw ingredient array to be parsed and reduced
        const meals = [];
        const rawIngredientList = [];

        // randomizes meals and adds sides to main dishes and appends ingredients to rawIngredientList array
        for (let l = count; l >= 0; l--){
            let i = mainMeals.length;
            let randomNum = Math.floor(Math.random() * i);
            
            if (mainMeals[randomNum].recipe_type === 'Main Dish'){
                for (let j = vegtables.length - 1; j >= 0; j--){
                    let vegtablesRandomNum = Math.floor(Math.random() * j);
                    rawIngredientList.push(vegtables[vegtablesRandomNum].ingredientList);
                    mainMeals[randomNum].vegtable = vegtables.splice(vegtablesRandomNum, 1)[0];
                    if (vegtables.length === 0){
                        vegtables = copyVegtables.slice();
                    };
                    break
                };
                for (let k = sides.length - 1; k >= 0; k--){
                    let sidesRandomNum = Math.floor(Math.random() * k);
                    rawIngredientList.push(sides[sidesRandomNum].ingredientList);
                    mainMeals[randomNum].side = sides.splice(sidesRandomNum, 1)[0];
                    if (sides.length === 0){
                        sides = copySides.slice();
                    };
                    break
                };
            }
            // *** need to add functionality of not repeating a recent meal  although currently there is about a 1/n**2 chance of a meal occurring back to back which will only happen once all the meals have been scheduled at least once ***
            rawIngredientList.push(mainMeals[randomNum].ingredientList);
            meals.push(mainMeals.splice(randomNum, 1)[0]);
            if (mainMeals.length === 0){
                mainMeals = copyMainMeals.slice();;
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

        res.locals.data = responseObj;

        // flatten the ingredients to easily parse and reduce data
        const flatRawIngredientList = rawIngredientList.flat(Infinity);

        // reduce overlapping data
        const reducedData = Object.values(flatRawIngredientList.reduce((result, item) => {
            delete item.ingredients_id;
            const key = item.ingredient_name + item.unit;
          
            if (result[key]) {
              result[key].amount += Number(item.amount);
            } else {
              result[key] = { ...item }; 
            }
          
            return result;
          }, {}));
          
        res.locals.groceryList = reducedData;

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

generationController.handleLoginData = (req, res, next) => {

    const responseObj = res.locals.data;
    const reducedData = res.locals.groceryList;

    // construct the mongoDB object
    const dbLoginData = {
        user_id: req.session.user_id,
        responseObj,
        reducedData
    }

    // first search if the user already has a generated recipe schedule
    models.UserData.findOne({user_id: dbLoginData.user_id })
        .then(user => {
            if (user) {
                // if they do delete, because the user is currently trying to render a new schedule
                user.delete()
                .then(() => {
                    console.log('User deleted');
                  })
                  .catch(error => {
                    console.error('Error deleting user:', error);
                  });
            }; 
        })
        .catch(error => {
            return next({
                log: 'an error occured in finding a users recipes',
                status: 400,
                message: 'an error occurred in finding a users recipes'
              });
        });
    
    // save the new randomized schedule in the mongoDB for future login retrieval 
    models.UserData.create(dbLoginData)
        .then(data => {
            console.log('new instance of user created')
            return next();
        })
        .catch(error => {
            return next({
                log: 'an error occured in creating a recipe instance',
                status: 400,
                message: 'an error occurred in adding dbLoginData to mongoDB'
              });
        });
};

generationController.fetchCreatedData = (req, res, next) => {

    models.UserData.findOne({user_id: req.session.user_id })
        .then(data => {
            console.log(data);
            res.locals.data = data;
            return next();
        })
        .catch(error => {
            return next({
                log: 'an error occured in finding a users recipes',
                status: 400,
                message: 'an error occurred in finding a users recipes'
              });
        });
};

module.exports = generationController;