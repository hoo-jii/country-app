import logo from './logo.svg';
import './App.css';

import {Countries} from './pages/countries';
import { SingleCountry } from './pages/singlecountry';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { useState } from 'react';




function App() {

  const [chosen, setChosen] = useState();
  const [reitti, setReitti] = useState("/");


  return (
    <div className="App">

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}


      {/* <Countries /> */}
      <div className='content-container'>
      <BrowserRouter>
      <Routes>

      {/* <Route exact path="/details/:id" element={<SingleCountry  chosenCountry={chosen}/>} />
      <Route path="/" element={<Countries setReitti={setReitti} setChosen={setChosen}/>} />
       */}
      <Route exact path="/details/:id" element={<SingleCountry />} />
      <Route path="/" element={<Countries />} />



      </Routes>


      </BrowserRouter>
      </div>


    </div>
  );
}

export default App;
