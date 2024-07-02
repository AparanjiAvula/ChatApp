import express from 'express';
import userSignup from '../controller/userController.js';
const userRouter=express.Router();

userRouter.get('/',(req,res)=>{
    res.send('User router is working');
})

userRouter.post('/post',userSignup);

export default userRouter;