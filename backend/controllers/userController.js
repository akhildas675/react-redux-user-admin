import User from '../models/users.js';
import bcrypt from 'bcryptjs';

const userSignup = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        if (!userName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(409).json({ message: 'User already exists, please login' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: 'Signup Successful' });
    } catch (error) {
        console.error('Error in signup:', error);
        res.status(500).json({ message: 'Something went wrong. Please try again.' });
    }
};

export default { userSignup };
