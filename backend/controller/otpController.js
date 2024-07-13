import crypto from 'crypto';
import userModel from '../model/userModel.js';
import { otpModel } from '../model/otpModel.js';
import transporter from '../utils/nodemailer.js';

export const generateOTP = async (req, res) => {
    try {
        const { userId } = req;
        
        // Find user by userId
        const user = await userModel.findById(userId);

        // If user is not found, return 400 status with a message
        if (!user) {
            return res.status(400).send({ msg: 'User not found' });
        }

        // Generate OTP, createAt, and expireAt
        const otp = crypto.randomInt(100000, 999999).toString();
        const createAt = new Date();
        const expireAt = new Date(createAt.getTime() + 5 * 60 * 1000);

        // Mail options for sending OTP via email
        const mailOptions = {
            from: "avulaaparanji@gmail.com",
            to: user.email,
            subject: 'ChatApp',
            text: `Hello user, this is the OTP for ChatApp: ${otp}. Please do not share it with anyone.`
        };

        // Check if OTP record already exists for the user
        let otpData = await otpModel.findOne({ userId });

        if (otpData) {
            // If OTP was sent less than 30 seconds ago, return 400 status
            let now = new Date();
            let prevCreatedAt = otpData.createAt;
            if (now.getTime() - prevCreatedAt.getTime() < 30000) {
                return res.status(400).send({ msg: "Please wait for 30 seconds before requesting a new OTP" });
            }

            // Send email with new OTP
            await transporter.sendMail(mailOptions);

            // Update existing OTP record
            await otpModel.updateOne({ userId }, {
                $set: {
                    otp,
                    createAt,
                    expireAt
                }
            });

            // Return success message
            return res.status(200).send({ msg: "OTP sent successfully" });
        } else {
            // Create new OTP record
            otpData = new otpModel({ userId: user._id, otp, createAt, expireAt });
            await transporter.sendMail(mailOptions);
            await otpData.save();

            // Return success message
            return res.status(200).send({ msg: "OTP sent successfully" });
        }

    } catch (err) {
        // Handle errors
        // console.error('Error in generateOTP:', err);
        return res.status(500).send({ msg: 'Something went wrong', errMsg: err.message });
    }
};



export const verifyOTP=async(req,res)=>{
try{
     const {userId}=req;
     const user=await userModel.findById(userId);
     if(!user){
        return res.status(400).send({msg:"user not found"})
     }
     else{
        console.log(user)
          const userOTPId=user._id;
        //   console.log(userOTPId);
          const otpData=await otpModel.findOne({userId:userOTPId})
          const now=new Date();
          console.log(otpData);
          if(now>otpData.expireAt){
            return res.status(400).send({msg:"otp is expired"})
          }
       else{
         let {otp}=req.body;
          if(otp==otpData.otp){
            return res.status(200).send({msg:"otp verified successfully"})
          }
          else{
            return res.status(400).send({msg:"otp not matching"})
          }
       }
     }
}catch(err){
    return res.status(500).send({ msg: 'Something went wrong', errMsg: err.message });
}

}