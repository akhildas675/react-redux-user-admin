import React, { useState } from 'react';
import { handleSubmit } from '../../../Services/UserServices/UserServices'
import { useNavigate } from 'react-router-dom';
const UserSignup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
  });

  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signup = async(e, formData)=>{
    const res = await handleSubmit(e, formData)
    if(res){
      navigate('/')
    }

  }
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

      <form onSubmit={(e) => signup(e, formData)}> 
        {/* userName */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">userName</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Enter userName"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Enter email"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Enter password"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition duration-200"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default UserSignup;
