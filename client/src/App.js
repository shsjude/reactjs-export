import React from 'react';
import Main from './Components/main.js';
import Charts from './Components/Charts.js';
import Exportexcel from './Components/exportExcel.tsx';
import '../src/App.css'


function App() {

  return (
      
    <div>
    <Charts/>
    <div className='container-fluid mb-5'> <Exportexcel/></div>
    <Main/>
    
  </div>
  
  );
  

}

export default App;
