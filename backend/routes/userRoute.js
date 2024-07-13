import express from 'express';
import {userSignup,userLogin,userLogout,userUpdate,getUser,deleteUser,chatUsers} from '../controller/userController.js';
import {verifyToken} from '../middleware/userTokenVerify.js';

const userRouter=express.Router();

userRouter.get('/',(req,res)=>{
    res.send({msg:'User router is working'});
})

userRouter.post('/signup',userSignup);
userRouter.post('/login',userLogin);
userRouter.get('/logout',userLogout);
userRouter.put("/update", verifyToken, userUpdate);
userRouter.get("/getuser", verifyToken, getUser);
userRouter.delete("/delete", verifyToken, deleteUser);
userRouter.get('/chat',verifyToken,chatUsers)
export default userRouter;