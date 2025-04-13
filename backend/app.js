const dotenv =require('dotenv');
dotenv.config();
const userRoute=require('./routes/userRoute');
const express = require('express')
const cors=require('cors');
const app = express();
const mongoose = require('mongoose');
const connectToDB = require('./DB/db');
connectToDB();
app.use(cors());
app.get('/', (req, res) => res.send('Hello World!'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/users',userRoute);
module.exports=app;

