import axios from 'axios';

export const handleSubmit = async (e, formData) => {
  e.preventDefault();

  if (!formData.userName || !formData.email || !formData.password) {
    alert('All fields are required from userSignup service');
    return;
  }

  try {
    console.log(formData, "I got formData signup");
    
    const response = await axios.post('http://localhost:5000/user/signup', formData);

    if (response.status === 200) {
      alert('Signup successful!');
    } else {
      alert(response.data.message || 'Signup failed');
    }
  } catch (err) {
    console.error('Error during signup:', err);
    alert(err.response?.data?.message || 'Something went wrong. Please try again.');
  }
};

export const handleLogin = async (formData) => {
  if (!formData.email || !formData.password) {
    alert('Email and password are required');
    return;
  }

  try {
    console.log(formData, "I got formData from login");
    
    const response = await axios.post('http://localhost:5000/user/login', formData);

    if (response.status === 200) {
      const data = response.data;
      alert('Login successful!');
      console.log(data);
      // localStorage.setItem('token', data.token); // Save token to local storage (if applicable)
    } else {
      alert(response.data.message || 'Login failed');
    }
  } catch (err) {
    console.error('Error during login:', err);
    alert(err.response?.data?.message || 'Something went wrong. Please try again.');
  }
};
