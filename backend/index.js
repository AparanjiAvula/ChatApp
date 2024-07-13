import express from 'express'
import cors from 'cors'
import { config } from 'dotenv';
import {dbConnect} from './DBconnect.js';
import userRouter from './routes/userRoute.js';
import { otpRouter } from './routes/otpRouter.js';
import messageRouter from './routes/messageRouter.js';
import cookieParser from 'cookie-parser';
const app=express();

//middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

config();

//routes
app.use('/user',userRouter);
app.use('/otp',otpRouter);
app.use('/msg',messageRouter);

//port and hostName
const port=process.env.port;
const hostname=process.env.host;

app.get('/',(req,res)=>{
    res.send({msg:'Api working'});
})

app.listen(port,hostname,()=>{
    console.log(`server at http://${hostname}:${port}`);
    dbConnect();
})