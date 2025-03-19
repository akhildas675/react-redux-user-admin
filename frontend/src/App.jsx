import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './Pages/UserPages/Login';
import Signup from './Pages/UserPages/SignUp';


const App = () => {
  return (
    <Router>
      <Routes>

        {/* UserRoutes */}
        <Route path="/login" element={<Login/>} />
        <Route path='/SignUp' element={<Signup/>}/>
      </Routes>
    </Router>
  );
}

export default App;
