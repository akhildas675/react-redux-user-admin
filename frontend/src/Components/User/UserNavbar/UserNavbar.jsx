import React from 'react';

const UserNavbar = () => {
    return (
        <div className="bg-gray-800 text-white p-4">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-semibold">User</h1>
                </div>
                <div>
                    <a href="/user" className="text-white hover:text-gray-300 transition duration-300">
                        Logout
                    </a>
                </div>
            </div>
        </div>
    );
}

export default UserNavbar;
