import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors'

import connectDB from './Config/db.js';


import userRoute from './routes/userRoutes.js';
import adminRoute from './routes/adminRoutes.js'


dotenv.config();


connectDB()

const app=express()
app.use(cors())
app.use(express.json())
app.use('/admin',adminRoute)
app.use('/', userRoute)

const PORT =process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server running port is ${PORT}`));