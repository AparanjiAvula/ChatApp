// import express from 'express';
import userModel from '../model/userModel.js';
import { config } from 'dotenv';
import bcrypt from 'bcrypt';

config();

const userSignup = async(req, res) => {
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


export default userSignup;