import Users from '../models/users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cloudinary from '../config/cloudinary.js';

// User Signup
const userSignup = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        if (!userName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existUser = await Users.findOne({ email });
        if (existUser) {
            return res.status(409).json({ message: 'User already exists, please login' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Users({
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

// User Login
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        
        res.status(200).json({ token, user });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update Profile
const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        console.log(req.body, req.file, "Uploaded Data");

        let imageUrl = null;

        if (req.file) {
            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload_stream(
                { folder: "user_profiles" },
                async (error, result) => {
                    if (error) {
                        console.error("Cloudinary Upload Error:", error);
                        return res.status(500).json({ message: "Image upload failed" });
                    }

                    imageUrl = result.secure_url;
                    console.log("Cloudinary Upload Success:", result.secure_url);
                    
                    const updatedUser = await Users.findByIdAndUpdate(
                        req.query.userId,
                        { userName:name, email:email, profilePic: imageUrl },
                        { new: true }
                    );


                        console.log("vishvajith",updatedUser )
                    if (!updatedUser) {
                        return res.status(404).json({ message: "User not found" });
                    }

                    res.status(200).json({ message: "Profile updated", user: updatedUser });
                }
            );

            result.end(req.file.buffer);
        } else {
            const updatedUser = await Users.findByIdAndUpdate(
                req.query.userId,
                {userName: name, email },
                { new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json({ message: "Profile updated", user: updatedUser });
        }
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Something went wrong. Please try again." });
    }
};

export default {
    userSignup,
    userLogin,
    updateProfile
};
