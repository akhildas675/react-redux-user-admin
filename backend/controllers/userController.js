import User from '../models/users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';





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

const userLogin = async (req,res)=>{
    try {
        const {email,password}=req.body
        if(!email ||!password){
            return res.json({message:"require all fields for login"})
        }

        const findUser= await User.findOne({email})

        if(!findUser){
            return res.json({message:"Invalid email Id"})
        }

        const matchPassword=await bcrypt.compare(password,findUser.password)
        if(!matchPassword){
            return res.json({message:"Invalid Password please try again"})
        }


        const token=jwt.sign({userId:findUser._id},process.env.JWT_SECRET_KEY,{expiresIn:'1h'})

        res.json({message:"Login successful",token})

    } catch (error) {
        console.log("Login error",error)
        res.json({message:'Server Error'})
    }
}

export default { 
    userSignup,
    userLogin,

 };
