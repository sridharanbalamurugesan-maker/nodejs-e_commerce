const User = require("../Models/User");
const crypto = require("crypto");
const sendMail = require("../utils/sentEmail");

exports.forgotPassword=async(req,res)=>{
    try {
        
        const {email}=req.body;
        
        const data=await User.findOne({email});
        if(!data){
           return res.status(400).json({
                success:false,
                message:"User Not Found",
            })
        }
        
        const resetToken=crypto.randomBytes(32).toString("hex");
        // console.log("resetToken",resetToken);
        data.resetToken=resetToken;
        data.resetTokenExpire=Date.now()+ 15 * 60 * 1000;
        // console.log("User Found");
        await data.save();
        // console.log("Token Saved");
        const resetUrl =`${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;
        await sendMail(
            data.email,
            "Reset Password",
      
            `<h2>Password Reset</h2>

            <p>Click below link to reset password</p>

            <a href="${resetUrl}">
                Reset Password
            </a>`
        )
        console.log("Mail Sent");
        return res.status(200).json({
            success: true,
            message: "Reset password link sent successfully",
        });
    } catch (error) {
         res.status(400).json({
                success: false,
                message: error.message,
                });
    }
}
