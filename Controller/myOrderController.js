const order = require("../Models/order");
const product = require("../Models/product");
const reviewProduct = require("../Models/reviewProduct");

exports.getAllOrders=async(req,res)=>{
    try {
        const userId=req.user.id;
        if(!userId){
            res.status(400).json({message:"User Not found"});
        }
        const data=await order.find({user:userId,status:"completed"}).populate("product").sort({ createdAt: -1 });
        // console.log("getAllOrder",data);
        if(!data){
            res.status(400).json({
                success:false,
                message:"Data Not Fatched",
                data:null
            })
        }
        res.status(200).json({
            success:true,
            message:"successfully fetched",
            data:data
        })
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}
exports.editOrder=async(req,res)=>{
    try {
        const {comment}=req.body
        const rating = Number(req.body.rating)
        const productId=req.params.id;
        const userId=req.user.id;
        const productData=await reviewProduct.findOne({product:productId,user:userId});
        if(!productData){
                return res.status(400).json({
                    success:false,
                    message:"Product Not Found",
                    data:null
                })
            }
        const updateData={rating};
        if(comment!==undefined){
            updateData.comment=comment;
        }
        let existingImages = [];
        if(req.body.existingImages){
            try {
                existingImages = typeof req.body.existingImages === "string"
                    ? JSON.parse(req.body.existingImages)
                    : req.body.existingImages;
            } catch (error) {
                existingImages = [];
            }
        }
        const newImages = req.files?.length
            ? req.files.map((file)=>`review/${file.filename}`)
            : [];
        updateData.images = [...existingImages, ...newImages];
        const data=await reviewProduct.findByIdAndUpdate(productData._id,updateData,{ returnOriginal: false });
            res.status(200).json({
                    success:true,
                    message:"Successfully Updated",
                    data:data
                });
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}