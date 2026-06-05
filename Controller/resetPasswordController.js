const User = require("../Models/User");
const bcrypt = require("bcryptjs");

exports.resetPassword=async(req,res)=>{
    try {
       
        const {token}=req.params;
        const {password}=req.body;
        //  console.log(token);
        // console.log(password);
        const user=await User.findOne({
            resetToken:token,
            resetTokenExpire:{$gt:Date.now()},
        });
        // console.log("user",user);
        if(!user){
              return res.status(400).json({
                    success: false,
                    message:"Invalid or expired token",
                        });
                 }
                 const hashPassword=await bcrypt.hash(password,2);
                //  console.log("hashedpassword",hashPassword);
                 user.password = hashPassword;
                 user.resetToken=null;
                 user.resetTokenExpire=null;
                 await user.save(); ////want to verify 
                 res.status(200).json({
                    success:true,
                    message:"Password reset successfully",
                 })
    } catch (error) {
         res.status(500).json({
            success: false,
            message: error.message,
            });

    }
}
exports.logedinResetPassword=async(req,res)=>{
    try {
        const {oldPassword,password}=req.body;
        const user=req.user
        // console.log("user",user);
        const loginUser=await User.findById(user.id)
        if(!loginUser){
            res.status(400).json({
                success:false,
                message:"User Not Found",
            })
        }
        const verify= await bcrypt.compare(oldPassword,loginUser.password);
        // console.log("verify",verify);
        if(!verify){
             return  res.status(400).json({message:"Enter The Correct Old Password"})
        }
        if (oldPassword === password) {
                return res.status(400).json({
                    success: false,
                    message: "Old password and new password cannot be the same"
                });
         }
        const hashedPassword=await bcrypt.hash(password,3);
        loginUser.password=hashedPassword;
        await loginUser.save();
        res.status(200).json({
            success:true,
            message:"Successfully password changed",
        })
    } catch (error) {
         res.status(500).json({
            success: false,
            message: error.message,
            });
    }
}
exports.validateResetToken = async (req, res) => {
    try {
        const { token } = req.params;

        const user = await User.findOne({
            resetToken: token,
            resetTokenExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "This reset link has expired or is no longer valid."
            });
        }

        res.status(200).json({
            success: true,
            message: "Valid reset link"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};