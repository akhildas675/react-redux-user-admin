import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleAdminLogin } from '../../../Services/AdminServices/AdminServices';
import { useNavigate } from 'react-router-dom';
import { setUserInfo } from '../../../Redux/Slices/UserSlice';

const AdminLogin = () => {
    
    const { userInfo } = useSelector((state) => state.user);
  const token = localStorage.getItem("adminToken")
  useEffect(()=>{

    if(userInfo&&token){
      navigate("/admin/home")
    }
  })
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await handleAdminLogin(formData);
            console.log(response,"Response from admin data front end")
            if (response) {
                navigate('/admin/Home'); 
                dispatch(setUserInfo(response.data.data))
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">
                    Admin Login
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Input */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-700 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                        required
                    />
                    {/* Password Input */}
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-700 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                        required
                    />
                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition duration-200 font-semibold"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
