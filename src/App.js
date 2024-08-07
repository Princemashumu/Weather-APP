import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Landing from './Components/Landing';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Landing" element={<Landing />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
