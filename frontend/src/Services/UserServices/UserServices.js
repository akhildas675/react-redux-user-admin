import axios from 'axios';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export const updateUserProfile = async (profileData, userId) => {
  try {
    const formData = new FormData();
    formData.append("name", profileData.name);
    formData.append("email", profileData.email);
    
    if (profileData.profileImage) {
      formData.append("profileImage", profileData.profileImage); 
    }

    const response = await axios.post(
      `http://localhost:5000/user/updateProfile?userId=${userId}`, 
      formData,
      {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toastr.success("Profile updated successfully");
    return response.data;
  } catch (error) {
    console.error("Profile update failed:", error);
    toastr.error(error.response?.data?.message || "Failed to update profile");
    throw new Error(error.response?.data?.message || "Failed to update profile");
  }
};

export const handleSubmit = async (e, formData) => {
  e.preventDefault();

  if (!formData.userName || !formData.email || !formData.password) {
    toastr.error('All fields are required');
    throw new Error('All fields are required');
  }

  try {
    const response = await axios.post('http://localhost:5000/user/signup', formData);
    console.log("The signup response ", response);
    if (response.status == 201) {
      toastr.success('Signup successful');
      return response.data;
    }
  } catch (error) {
    console.error('Error during signup:', error);
    toastr.error(error.response?.data?.message || 'Something went wrong');
    throw new Error(error.response?.data?.message || 'Something went wrong');
  }
};

export const handleLogin = async (formData) => {
  if (!formData.email || !formData.password) {
    toastr.error('Email and password are required');
    throw new Error('Email and password are required');
  }

  try {
    const response = await axios.post('http://localhost:5000/user/login', formData);
    if (response.status === 200) {
      localStorage.setItem('token', response.data.token);
      toastr.success('Login successful');
      return response.data;
    }
    throw new Error(response.data.message || 'Login failed');
  } catch (error) {
    console.error('Error during login:', error);
    toastr.error(error.response?.data?.message || 'Something went wrong');
    throw new Error(error.response?.data?.message || 'Something went wrong');
  }
};
