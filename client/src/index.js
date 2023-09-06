import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HelmetProvider } from'react-helmet-async';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { StoreProvider } from './Context/Store';
//axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.baseURL = process.env.REACT_APP_VAL;
console.log(process.env.REACT_APP_VAL);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StoreProvider>
    <HelmetProvider>
    <App />
    </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>
);

reportWebVitals();
