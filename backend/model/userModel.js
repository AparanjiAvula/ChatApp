import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
     username:{type:String,require:true},
     fName:{type:String},
     LName:{type:String},
     email:{type:String,require:true,unique:true},
     email:{type:String},
     gender:{type:String},
     age:{type:Number},
     address:{
        type:{
            location:String,
            landmark:String,
            pin:Number,
            state:String,
            country:String
        }
     },
     created:{type:Date,default:Date.now()},
     password:{type:String,require:true}
})

const userModel=mongoose.model('users',userSchema);

export default userModel;