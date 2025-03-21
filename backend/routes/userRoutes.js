import express from 'express';
import userController from '../controllers/userController.js';
import upload from "../config/multer.js"
const userRoute = express.Router();

userRoute.post('/user/signup', userController.userSignup);

userRoute.post('/user/login',userController.userLogin)
userRoute.post('/user/updateProfile',upload.single('profileImage'),userController.updateProfile)

export default userRoute;
