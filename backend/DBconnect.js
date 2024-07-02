import mongoose  from "mongoose";
import { config } from "dotenv";

config();

const url=process.env.mongoUrl;


export const dbConnect=async()=>{
    try{
         await mongoose.connect(url);
         console.log('DB connected');
    }catch(e){
        console.log(e)
    }
}


