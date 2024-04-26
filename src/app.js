import express from 'express'
const app = express();
import connectDB from './DB/index.js';
import {PORT} from './constants.js';
app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running on port ${PORT}`);
})