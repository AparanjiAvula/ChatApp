// import express from 'express';
import userModel from '../model/userModel.js';
import { config } from 'dotenv';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

config();

export const userSignup = async(req, res) => {
    try {
        const { username, fName, password, email } = req.body;

        if (!username || !fName || !password || !email) {
            return res.send({ msg: "Provide all fields" })
        }
        else{
           const found= await userModel.findOne({email:email});

           if(found){
             return res.status(400).send({msg:'User already Registered'});
           }
           else{
                const hashpassword=bcrypt.hashSync(password,10)
                const user=new userModel({...req.body,password:hashpassword});
                let response= await user.save();
                res.status(201).send(response);
           }
        }

    } catch (e) {
        res.status(500).send({ msg: "something went wrong in server",errorMSg:e.message});
    }
}

export const userLogin=async(req,res)=>{
    try{
       const {email,password}=req.body;
       if(!email||!password){
        res.status(400).send({msg:'Provide all fields'})
       }
       else{
         let  response=await userModel.findOne({email:email})
         if(response){
            //bcrypt
              let matchpassword=bcrypt.compareSync(password,response.password) 

                if(matchpassword) {
                     //jwt
                     const userId=response._id;
                     const token=jsonwebtoken.sign({userId},process.env.JWT_secret,{ expiresIn:"7d"})
                     res.cookie('auth_token',token,{maxAge:1000*60*60*24*7,httpOnly:true})                   
                     return res.status(200).send({message:"Login successfully"});
                }
                else return res.status(400).send({message:"Invalid user"});
            }
         }
       }
    catch(e){
        return res.status(500).send({message:"something wrong ",errorMSg:e.message})
    }
}
    
 


// export default userSignup;