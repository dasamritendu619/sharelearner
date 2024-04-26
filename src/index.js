import dotenv from 'dotenv';
import express from 'express';
import connectDB from './DB/index.js';
const app=express();
import {PORT} from './constants.js';
app.get('/',(req,res)=>{
    res.send('Hello World');
});
app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running on port ${PORT}`);
})