import express from 'express';

const adminRoute = express.Router();

import adminController from '../controllers/adminController.js';

adminRoute.post('/login', adminController.adminLogin);
adminRoute.get('/getAllUsers', adminController.getAllUsers);
adminRoute.post('/create', adminController.createUser);
adminRoute.put('/update/:userId', adminController.editUser);
adminRoute.delete('/delete/:userId', adminController.deleteUser,);

export default adminRoute;
