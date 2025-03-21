import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './Pages/UserPages/Login';
import Signup from './Pages/UserPages/SignUp';
import UserHome from './Pages/UserPages/Home';
import UserProfile from './Pages/UserPages/Profile';
import LoginAdmin from './Pages/AdminPages/LoginAdmin';
import HomeAdmin from './Pages/AdminPages/HomeAdmin';
import UserProtector from './Components/Routes/UserProtector';
import AdminProtector from './Components/Routes/Protector/AdminProtector';

const App = () => {
  return (
    <Router>
      <Routes>

        {/* User Routes */}
        <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        <Route element={<UserProtector/>} >
          <Route path="/home" element={<UserHome />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route element={<AdminProtector />}>
          <Route path="/admin/home" element={<HomeAdmin />} />
        </Route>
        
      </Routes>
    </Router>
  );
};

export default App;
