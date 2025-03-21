import axios from 'axios';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export const handleAdminLogin = async (formData) => {
    try {
        const data = await axios.post('http://localhost:5000/admin/login', formData);
        console.log("1", data.data.data.isAdmin);

        if (data.data.data.isAdmin) { 
            console.log("13");
            localStorage.setItem('adminToken', JSON.stringify(data.data.token));
            console.log("15", data.data.data);
            console.log(data, "I got data from the admin");

            toastr.success('Admin login successful');
            return data;
        } else {
            console.error('Not an admin');
            toastr.error('Not authorized as an admin');
            throw new Error('Not authorized as an admin');
        }
    } catch (error) {
        console.error('Login failed:', error.response?.data?.message || error.message);
        toastr.error(error.response?.data?.message || "Admin login failed");
        throw new Error(error.response?.data?.message || "Admin login failed");
    }
};

export const getUsers = async () => {
    try {
        const data = await axios.get('http://localhost:5000/admin/getAllUsers');
        // toastr.success("Fetched users successfully");
        return data;
    } catch (error) {
        console.error('Fetching users failed:', error.response?.data?.message || error.message);
        toastr.error(error.response?.data?.message || "Failed to fetch users");
        throw new Error(error.response?.data?.message || "Failed to fetch users");
    }
};

export const createUser = async (formData) => {
    try {
        console.log(formData, "The create form data");
        const response = await axios.post('http://localhost:5000/admin/create', formData, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        });

        toastr.success('User created successfully');
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        toastr.error(error.response?.data?.message || "Failed to create user");
        throw new Error(error.response?.data?.message || "Failed to create user");
    }
};

export const updateUser = async (formData, userId) => {
    try {
        const response = await axios.put(`http://localhost:5000/admin/update/${userId}`, formData, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        });

        console.log(response.data);
        toastr.success('User updated successfully');
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        toastr.error(error.response?.data?.message || "Failed to update user");
        throw new Error(error.response?.data?.message || "Failed to update user");
    }
};


export const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`http://localhost:5000/admin/delete/${userId}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        });

        console.log(response.data);
        toastr.success('User deleted successfully');
        return response.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        toastr.error(error.response?.data?.message || "Failed to delete user");
        throw new Error(error.response?.data?.message || "Failed to delete user");
    }
};
