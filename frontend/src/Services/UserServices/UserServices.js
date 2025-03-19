export const handleSubmit = async (e, formData) => {
    e.preventDefault();
  
    
    if (!formData.username || !formData.email || !formData.password) {
      alert('All fields are required');
      return;
    }
  
    try {
        console.log(formData,"odi working")
      const response = await fetch('http://localhost:5000/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert('Signup successful!');
      } else {
        const data = await response.json();
        alert(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error('Error during signup:', err);
      alert('Something went wrong. Please try again.');
    }
  };
  


  export const handleLogin = async (formData) => {
    
    if (!formData.email || !formData.password) {
      alert('Email and password are required');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert('Login successful!');
        console.log(data)
        // localStorage.setItem('token', data.token); // Save token to local storage (if applicable)
      } else {
        const data = await response.json();
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Error during login:', err);
      alert('Something went wrong. Please try again.');
    }
  };
  