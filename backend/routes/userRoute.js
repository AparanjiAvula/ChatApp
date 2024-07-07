import express from 'express';
import {userSignup,userLogin} from '../controller/userController.js';
const userRouter=express.Router();

userRouter.get('/',(req,res)=>{
    res.send({msg:'User router is working'});
})

userRouter.post('/signup',userSignup);
userRouter.post('/login',userLogin);

export default userRouter;