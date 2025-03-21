import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/users.js';

// Admin Login
const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const findAdmin = await User.findOne({ email, isAdmin: true });
        if (!findAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const isMatchAdminPassword = await bcrypt.compare(password, findAdmin.password);
        if (!isMatchAdminPassword) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { userId: findAdmin._id, isAdmin: true },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: "Admin Login successful",
            token,
            data: findAdmin
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Create User
const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    console.log("Create user data form the body",req.body)
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            userName:name,
            email:email,
            password: hashedPassword,
            isBlocked: false
        });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Create user error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete User
const deleteUser = async (req, res) => {
    const { userId } = req.params;
    console.log("Deleting user with ID:", userId);

    try {
        const user = await User.findById(userId);
        console.log("User found:", user);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.findByIdAndDelete(userId);
        console.log("User deleted successfully");

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};


// Edit User


const editUser = async (req, res) => {
    const { userId } = req.params;
    const { name, email, password } = req.body;
    console.log("The data from the backend edit",req.body)

    try {
       
        const user = await User.findById(userId);
        console.log(user,"odudiasid")
        if (!user) {
            return res.status(404).json({ message: 'User not found' });

        }

      
        if (email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: 'Email already in use' });
            }
        }

        let hashedPassword = user.password; 
        if (password) {
           
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // Update the user
        const updatedUser = await User.findByIdAndUpdate(
                userId,
            { userName:name, email, password: hashedPassword },
           
        );

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Edit user error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};




// Block User
const blockUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndUpdate(
            id,
            { isBlocked: true },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User blocked successfully', user });
    } catch (error) {
        console.error('Block user error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Unblock User
const unblockUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndUpdate(
            id,
            { isBlocked: false },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User unblocked successfully', user });
    } catch (error) {
        console.error('Unblock user error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
const getAllUsers = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json({ message: 'User unblocked successfully', user });
    } catch (error) {
        console.error('Unblock user error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export default {
    adminLogin,
    createUser,
    deleteUser,
    editUser,
    blockUser,
    unblockUser,
    getAllUsers,
};
