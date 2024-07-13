import express from 'express';
import { getMsgController, sendMsgController } from '../controller/messageController.js';
import  {verifyToken} from '../middleware/userTokenVerify.js';


const messageRouter=express.Router();

messageRouter.get('/',(req,res)=>{
    res.send('HI iam message router');
})

messageRouter.post('/sendMsg/:receiverId',verifyToken,sendMsgController);
messageRouter.get('/getMsg/:receiverId',verifyToken,getMsgController);


export default messageRouter;