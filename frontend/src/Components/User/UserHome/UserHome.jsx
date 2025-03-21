import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../Redux/Slices/UserSlice';

const UserHome = () => {
    const { userInfo } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            // dispatch(logoutUser());
            // navigate('/');
        } 
    }, [navigate, dispatch]);
    

    const handleProfileClick = () => {
        
        navigate(`/profile?userId=${userInfo._id}`);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(logoutUser());
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <div className="bg-gray-900 rounded-lg shadow-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6">
                    Welcome {userInfo?.userName || 'User'}
                </h1>
                
                <div className="flex flex-col gap-4">
                    <button 
                        onClick={handleProfileClick} 
                        className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded transition duration-300"
                    >
                        Profile
                    </button>

                    <button 
                        onClick={handleLogout} 
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition duration-300"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserHome;
