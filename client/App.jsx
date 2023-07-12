import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Welcome from './pages/Welcome.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Homepage from './pages/Homepage.jsx';
import Recipes from './pages/Recipes.jsx';

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
    </>
  );
};

export default App;