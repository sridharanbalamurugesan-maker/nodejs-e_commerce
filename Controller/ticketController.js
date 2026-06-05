const support = require("../Models/support");

exports.getAllTicket=async(req,res)=>{
    try {
        const userId=req.user.id;
        if(!userId){
            res.status(400).json({message:"User Not Found"});
        }
        const data = await support.find({
                user: userId,
                status: {$in: ["open", "rejected"]},
                  })
                .populate("user","name")
                .sort({ createdAt: -1 });
    
            res.status(200).json({
                success:true,
                message:"successfully fetched",
                data:data,
            })
        
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}
exports.adminTicket=async(req,res)=>{
    try {
        const user=req.user.id;
        if(!user){
          return  res.status(400).json({message:"User Not Found"})
        }
        const data=await support.find({ status:{$in:["open","pending"]}}).populate("user","name").sort({ createdAt: -1 });
        res.status(200).json({
            success:true,
            message:"successfully fetched",
            data:data,
        });
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}