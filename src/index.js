import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Land from './router';
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    
    <BrowserRouter>
     <Land />
    </BrowserRouter>
    

  </>

);
