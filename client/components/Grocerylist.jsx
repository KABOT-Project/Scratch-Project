import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';

const Grocerylist = ({groceryList}) => {

    return (

        <div>
            {groceryList.map((ingredient, index) => 
            <li key={index}>{ingredient.ingredient_name}: {ingredient.amount} {ingredient.unit}</li>
            )}
        </div>
    )

}

export default Grocerylist;