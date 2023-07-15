import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

render(
  <GoogleOAuthProvider clientId="436308603108-380rhsf5aesqeu5khtum6r66bo2pppmb.apps.googleusercontent.com">
    <BrowserRouter>
     <App />
    </BrowserRouter>
  </GoogleOAuthProvider>,
   document.getElementById('app'),
);
