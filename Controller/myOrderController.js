const order = require("../Models/order");
const product = require("../Models/product");
const reviewProduct = require("../Models/reviewProduct");

exports.getAllOrders=async(req,res)=>{
    try {
        const userId=req.user.id;
        if(!userId){
            res.status(400).json({message:"User Not found"});
        }
        const data=await order.find({status:"completed"}).populate("product").sort({ createdAt: -1 });
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
        const {rating}=req.body
        const productId=req.params.id;
        const productData=await reviewProduct.findOne({product:productId});
        if(!productData){
                res.status(400).json({
                    success:false,
                    message:"Product Not Found",
                    data:null
                })
            }
        const data=await reviewProduct.findByIdAndUpdate(productData._id,{rating},{ returnOriginal: false });
            res.status(200).json({
                    success:true,
                    message:"Successfully Updated",
                    data:data
                });
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}