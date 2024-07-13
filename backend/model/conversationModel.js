import mongoose, { Schema } from "mongoose";

const conversationSchema=new mongoose.Schema({
    participates:[
        {
            type:Schema.Types.ObjectId,
            require:true,
            ref:"users"
        }
    ],
    messages:[
        {
            type:String,
            require:true,
            ref:"messages"
        }
    ]
},{timestamps:true})


export const conversationModel=mongoose.model('conversation',conversationSchema);