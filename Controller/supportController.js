const support = require("../Models/support");

exports.createSupport=async(req,res)=>{
    try {
        const userId=req.user.id;
        const {subject,category,description,image}=req.body;
        const count=await support.countDocuments();
        console.log("count",count);
        if(!userId){
            res.status(400).json({message:"User Not Found"});
        }
        const ticketId=`SUP${1000+count+1}`;
        const data=await support.create({
            user:userId,
            ticketId,
            subject,
            category,
            description,
            status:"open",
            image:req.file?`support/${req.file.filename}`:null,
        })
        res.status(201).json({
            success:true,
            message:"successfully created",
            data:data,
        });
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}