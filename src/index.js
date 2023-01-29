/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { MoralisProvider } from "react-moralis";
'react-google-recaptcha-v3';

import App from './App';
import reportWebVitals from './reportWebVitals';

require('dotenv').config();

const root = ReactDOM.createRoot(document.getElementById('root'));
const appId = process.env.REACT_APP_MORALIS_ID
const serverUrl = process.env.REACT_APP_MORALIS_URL
const googCaptchaKey = process.env.REACT_APP_RECAPTCHA_KEY

root.render(
  <React.StrictMode>
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
 

    <App />
  

    </MoralisProvider>,

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

