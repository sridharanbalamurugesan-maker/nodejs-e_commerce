const products=require('../Models/product');
const pagination = require('../utils/pagination');

exports.createProduct=async(req,res)=>{
    try {
        const {name,price,description,stocks,category}=req.body;
        if(!req.file){
          return res.status(400).json({message:"Image required"});
        }
        const newProducts=await products.create({
            name,
            price,
            description,
            stocks,
            category,
            image:`product/${req.file.filename}`
        });
        res.status(201).json({
            success:true,
            message:"successfully created",
            data:newProducts
        })
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

exports.getAllProducts=async(req,res)=>{
    try {
        // const allProducts=await products.find();
        const page = req.query.page || 1;
        const limit = req.query.limit || 8;
        const data= await pagination(
              products,
              {},
              req.query.page,
              req.query.limit,
              "category"
        );
        // console.log(data);
         res.status(201).json({
            success:true,
            message:"successfully fetch",
            ...data
        })
    } catch (error) {
          res.json({
            success:false,
            message:error.message,
        data:null});
    }
}

exports.editProduct=async(req,res)=>{
    try {
        const id=req.params.id;
        const uodateData={
            name:req.body.name,
            description:req.body.description,
            stocks:req.body.stocks,
            price:req.body.price,
            category:req.body.category
        }
        if(req.image){
            uodateData.image=req.file.filename;
        }
        const data=await products.findByIdAndUpdate(id,uodateData,{new:true})
        console.log("Product",data);
        if(!data){
            res.status(400).json({
                success:false,
                message:"Product id not found",
                data:null
            })
        }
        res.status(200).json({
            success:true,
            message:"successfully update",
            data:data
        })
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

exports.deleteProduct=async(req,res)=>{
    try {
        const id=req.params.id;
        const deleteData=await products.findByIdAndDelete(id);
        if(!deleteData){
            res.status(400).json({
                success:false,
                message:"product not found",
                data:null
            })
        }
        res.status(200).json({
            success:true,
            message:"successfully deleted",
            data:null
        })
    } catch (error) {
            res.status(500).json({message:error.message});       
    }
}

exports.productView=async(req,res)=>{
    try {
        const id=req.params.id;
        const viewProduct=await products.findById(id);
        // console.log("viewProduct",viewProduct);
        if(!viewProduct){
            res.status(400).json({
                success:false,
                message:"failed to fetch",
                data:null
            })
        }
        res.status(200).json({
            success:true,
            message:"successfully fetched",
            data:viewProduct
        })
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}