import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Landing from './Components/Landing';
import Settings from './Components/Settings';
import Locations from './Components/Locations';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Landing />} />
          <Route path="/settings" element={<Settings />} />
          <Route path='/locations' element={<Locations/>} />
        {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
