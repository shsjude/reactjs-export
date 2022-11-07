import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App.js';
import '../src/Components/main.css';
import '../src/Components/exportExcel.tsx';
import '../src/App.css';
import reportWebVitals from './reportWebVitals';
import {registerLicense} from '@syncfusion/ej2-base';


//Registering Syncfusion licensekey
registerLicense('ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGJWf1ppR2NbfU5xdF9FZlZQTGY/P1ZhSXxRd0VhWX1cc3xRRmZUUEw=');



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
