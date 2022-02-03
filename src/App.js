import './App.css';

import { Countries } from './pages/countries';
import { SingleCountry } from './pages/singlecountry';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";


function App() {

  return (
    <div className="App">

      <div className='content-container'>
        <BrowserRouter>
          <Routes>
            <Route exact path="/details/:id" element={<SingleCountry />} />
            <Route path="/" element={<Countries />} />
          </Routes>
        </BrowserRouter>
      </div>

    </div>
  );
}

export default App;
