import React, { useEffect, useState } from 'react';
import { handleLogin } from '../../../Services/UserServices/UserServices'; 
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../../../Redux/Slices/UserSlice';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { userInfo } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (userInfo && token) {
      navigate("/home");
    }
  }, [userInfo, token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await handleLogin(formData);
    if (response) {
      dispatch(setUserInfo(response.user));
      localStorage.setItem("token", response.token);
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-sm p-8 border border-gray-700 rounded-xl shadow-lg bg-gray-950">
        <h2 className="text-3xl font-semibold mb-6 text-center text-white tracking-wide">
          User Login
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-5">
            <label className="block text-gray-400 mb-2 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
              placeholder="Enter email"
            />
          </div>

          {/* Password Field */}
          <div className="mb-5">
            <label className="block text-gray-400 mb-2 text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
              placeholder="Enter password"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition duration-300 font-semibold tracking-wide"
          >
            Login
          </button>
        </form>

        {/* Sign Up Button */}
        <p className="text-gray-400 text-sm text-center mt-4">
          Don't have an account?
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-300 font-semibold tracking-wide mt-2"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default UserLogin;
