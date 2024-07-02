import express from 'express';

const userRouter=express.Router();

userRouter.get('/',(req,res)=>{
    res.send('User router is working');
})



export default userRouter;