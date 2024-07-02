import express from 'express'
import cors from 'cors'
import { config } from 'dotenv';
import {dbConnect} from './DBconnect.js';
import userRouter from './routes/userRoute.js';
const app=express();

//middleware
app.use(express.json());
app.use(cors());
config();

//routes
app.use('/user',userRouter);

//port and hostName
const port=process.env.port;
const hostname=process.env.host;


app.listen(port,hostname,()=>{
    console.log(`server at http://${hostname}:${port}`);
    dbConnect();
})