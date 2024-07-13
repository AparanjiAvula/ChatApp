import {messageModel} from '../model/messageModel.js'
import { conversationModel } from '../model/conversationModel.js';

export const sendMsgController=async(req,res)=>{
    
   try{
        const {receiverId}=req.params;
        const senderId=req.userId;
        const {message}=req.body;
        const conversation=await conversationModel.findOne({ participates:{$all:[senderId,receiverId]}})
        if(!conversation){
            conversation=await conversationModel.create({participates:[senderId,receiverId]})
        }
        const messageData=new messageModel({senderId,receiverId,message});
        conversation.messages.push(messageData._id);
        // await messageData.save();
        // await conversation.save();
        Promise.all([messageData.save(),conversation.save()])
       res.status(200).send({msg:"Message sent Successfully"});

   }catch(e){
    return res.status(500).send({msg:'something went wrong',e})
   }

}

export const getMsgController=async(req,res)=>{
    try{
        const {receiverId}=req.params;
        const senderId=req.userId;
        
        const conversation=await conversationModel.findOne({ participates:{$all:[senderId,receiverId]}},
            {messages:1,_id:0}).populate("messages")

        res.status(200).send({message:conversation.messages});

     }catch(e){
      return res.status(500).send({msg:'something went wrong',e})
     }
}