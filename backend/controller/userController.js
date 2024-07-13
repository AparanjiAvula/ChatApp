// import express from 'express';
import userModel from '../model/userModel.js';
import { config } from 'dotenv';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

config();

//----------------------------signup-------------------------------------

export const userSignup = async(req, res) => {
    console.log(req.body);
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
                 await user.save();
                res.status(201).send({msg:'Registered Successfully'});
           }
        }

    } catch (e) {
        res.status(500).send({ msg: "something went wrong in server",errorMSg:e.message});
    }
}


//------------------------------------------------login--------------------------------------
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
    
 
//-----------------------------------Logout------------------------------------------------------
export const userLogout=async(req,res)=>{
     try{
         res.clearCookie('auth_token');
         return res.status(200).send({msg:"Logout Successfully"});
     }catch(err){
        return res.status(500).send({msg:"something went wrong",errorMSg:error.message})
     }
}

// ---------------------------------------------------Update----------------------------------------------------------------
export const userUpdate = async (req, res) => {
    try {
      const userId = req.userId;
      const data = req.body;
      const newData = await userModel.findByIdAndUpdate(userId, {
        $set: { ...data },
      });
      res.status(200).send({ message: "Details updated", userData: { newData } });
    } catch (error) {
      res
        .status(500)
        .send({ error: "Something went wrong   ", errMsg: error.message });
    }
  };


  //-------------------------------------------------- Getuser---------------------------------------------------------------
export const getUser = async (req, res) => {
    try {
      const { userId } = req;
      const userDetails = await userModel
        .findById(userId)
        .select("-_id -password -__v");
      if (!userDetails) {
        return res.status(403).send({ error: "User is not available" });
      } else return res.status(200).send(userDetails);
    } catch (error) {
      res.status(400).send({ error: "Something went wrong   " + error.message });
    }
  };
  

  //----------------------------------------------- Delete----------------------------------------------------------------
export const deleteUser = async (req, res) => {
    try {
      const userId = req.userId;
      await userModel.findByIdAndDelete(userId);
      res.clearCookie("auth_token");
      res.status(200).send({ message: "User is Deleted" });
    } catch (error) {
      res.status(500).send({ error: "Something went wrong   " + error.message });
    }
  };


  //get users all
  export const chatUsers = async (req, res) => {
    try {
      const userId = req.userId;
      const user=await userModel.findById(userId);
      const users=await userModel.find({email:{$ne:user.email}});
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send({ error: "Something went wrong   " + error.message });
    }
  };


  
