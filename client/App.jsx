import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Homepage from './pages/Homepage.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Recipes from './pages/Recipes.jsx';
import Add from './pages/Add.jsx';

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </>
  );
};

export default App;