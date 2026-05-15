const order = require('../Models/order');
const Product = require('../Models/product');
const User = require('../Models/User');

exports.addCart=async(req,res)=>{
    try {
        const {product,quantity,user}=req.body;
        const data= await Product.findById(product.id);
        // console.log("productData",data);
        if(!data){
           return  res.status(400).json({
            success:false,
            message:"Product Not Found",
            data:null
        });
        }
        const totalPrice=data.price*quantity;
        const newOrder=await order.create({
            user:user.id,
            product:data._id,
            quantity,
            price:data.price,
            totalPrice:totalPrice,
            status:"pending"
        })
        res.status(201).json({
            success:true,
            message:"successfully Added",
            data:newOrder
        });
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

exports.getCartByUser=async(req,res)=>{
    try {
        // console.log("req.params",req.user.id);
        // console.log("req.params.id",req.params.id);
        const id=req.user.id;
        const data=await order.find({user:id,status:"pending"}).populate("product")
        // console.log("cartUserData",data);
        if(!data){
           return res.status(400).json({
            success:false,
            message:"User Not Found",
            data:null
            });
        }
        res.status(200).json({
             success:true,
            message:"successfully fetched",
            data:data
        })
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

exports.deleteCart=async(req,res)=>{
    try {
        const id=req.params.id;
        // console.log("req.params.id",req.params.id);
        const data=await order.findByIdAndDelete(id);
        if(!data){
            res.status(400).json({
                success:false,
                message:"failed to delete",
                data:null
            })
        }
        res.status(200).json({
             success:true,
                message:"Deleted",
                data:null
        })
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}