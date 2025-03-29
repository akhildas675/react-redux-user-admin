import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../Redux/Slices/UserSlice';
import { createUser, getUsers, updateUser, deleteUser } from '../../../Services/AdminServices/AdminServices';

const AdminHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    id: null,
    email: '',
    password: '',
    name: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data.user || []);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    setFormData({ id: null, email: '', password: '', name: '' });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEdit = (user) => {
    setFormData({
      _id: user._id,
      email: user.email,
      password: '',
      name: user.userName || user.name,
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        setUsers(users.filter((user) => user._id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateUser(formData, formData._id);
      } else {
        const newUser = { _id: Date.now().toString(), ...formData };
        setUsers([...users, newUser]);
        await createUser(newUser);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving user:', error);
      alert(error.message || 'Failed to save user');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logoutUser());
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center p-6">
      <div className="w-full max-w-4xl bg-gray-900 rounded-lg shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Admin User Management</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition duration-200 font-semibold"
          >
            Logout
          </button>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-200">Users List</h2>
            <button
              onClick={handleCreate}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition duration-200"
            >
              + Add User
            </button>
          </div>

          {users.length === 0 ? (
            <p className="text-gray-400">No users found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-200">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b border-gray-700 hover:bg-gray-800">
                      <td className="p-3">{user.userName || user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3 flex gap-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-500 transition duration-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition duration-200"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-white mb-4">
              {isEditing ? 'Edit User' : 'Create User'}
            </h2>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="p-3 bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="p-3 bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="p-3 bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded focus:ring-2 focus:ring-blue-500"
                required={!isEditing}
              />
              <div className="flex justify-between">
                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition duration-200">Cancel</button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-200">{isEditing ? 'Update User' : 'Create User'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHome;
