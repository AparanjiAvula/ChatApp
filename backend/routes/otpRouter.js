import express from 'express';
import { generateOTP,verifyOTP } from '../controller/otpController.js';
import { verifyToken } from '../middleware/userTokenVerify.js';


export const otpRouter=express.Router();

otpRouter.get('/',(req,res)=>{
    res.send('OTP router is working');
})


otpRouter.get('/generate',verifyToken,generateOTP)



otpRouter.post('/verify',verifyToken,verifyOTP) 