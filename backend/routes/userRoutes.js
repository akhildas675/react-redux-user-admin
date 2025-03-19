import express from 'express';
import userController from '../controllers/userController.js';

const userRoute = express.Router();

userRoute.post('/user/signup', userController.userSignup);

userRoute.post('/user/login',userController.userLogin)

export default userRoute;
