import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../../Services/UserServices/UserServices';
import { useLocation } from 'react-router-dom';
import { setUserInfo } from '../../../Redux/Slices/UserSlice';

const UserProfile = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  
  const [name, setName] = useState(userInfo?.userName || '');
  const [email, setEmail] = useState(userInfo?.email || '');
  const [profileImage, setProfileImage] = useState(userInfo?.profilePic || null); // URL or null
  const [selectedFile, setSelectedFile] = useState(null); // File object for upload
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch()
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // Store the file object
      setProfileImage(URL.createObjectURL(file)); // Preview the image locally
    }
  };
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const profileData = {
        name,
        email,
        profileImage: selectedFile, 
      };
      const response = await updateUserProfile(profileData,userId);
      alert('Profile updated successfully!');
      console.log(response,"vish")
      dispatch(setUserInfo(response.user))
      setSelectedFile(null); // Clear the file after successful upload
      setProfileImage(profileImage||response.profileImage ); // Update with returned URL if provided
      console.log(response);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-gray-900">
        <h2 className="text-3xl font-bold mb-6 text-center">User Profile</h2>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <label htmlFor="fileInput" className="relative cursor-pointer">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full border-4 border-gray-700"
              />
            ) : (
              <div className="w-32 h-32 flex items-center justify-center bg-gray-800 text-gray-400 rounded-full border-4 border-gray-700">
                Add Image
              </div>
            )}
            <input
              type="file"
              id="fileInput"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
          <button
            className="mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded text-sm"
            onClick={() => document.getElementById('fileInput').click()}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : profileImage ? 'Update Image' : 'Add Image'}
          </button>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-400">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Enter your name"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Enter your email"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gray-700 hover:bg-gray-600 rounded text-white font-semibold transition duration-200"
            disabled={uploading}
          >
            {uploading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;