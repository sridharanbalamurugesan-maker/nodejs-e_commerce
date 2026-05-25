const products=require('../Models/product');
const pagination = require('../utils/pagination');
const Review=require('../Models/reviewProduct');
const { default: mongoose } = require('mongoose');

exports.createProduct=async(req,res)=>{
    try {
        const {name,price,description,stocks,category,brand,isFreeShipping}=req.body;
        if(!req.file){
          return res.status(400).json({message:"Image required"});
        }
        const newProducts=await products.create({
            name,
            price,
            description,
            stocks,
            category,
            brand,
            isFreeShipping,
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
exports.getProductByFilter=async(req,res)=>{
    try {
        const {category,brand,minPrice,maxPrice,rating,freeShipping}=req.query;
        let filter={};
        if(category){
            filter.category=new mongoose.Types.ObjectId(category);
        }
        if(brand){
            filter.brand={$in:brand.split(",")};
        }
        if(rating){
            filter.rating={$gte:Number(rating)};
        }
        if(freeShipping=="true"){
            filter.isFreeShipping=true;
        }
        if(minPrice||maxPrice){
            filter.price={};
            if(minPrice)filter.price.$gte=Number(minPrice);
            if(maxPrice)filter.price.$lte=Number(maxPrice);
        }
        // console.log("FILTER:", filter);

        const data=await products.find(filter).populate("category");
        res.status(200).json({
            success:true,
            message:"successfully fetch",
            data:data
        })
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}
exports.addReview=async(req,res)=>{
    try {
        const {rating,comment}=req.body;
        const productId = req.params.id;
        const userId=req.user.id;
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }
        //  const alreadyReviewed = await Review.findOne({
        //     product: productId,
        //     user: userId
        // });

        // if (alreadyReviewed) {
        //     return res.status(400).json({ message: "You already reviewed this product" });
        // }
        const newReview=await Review.create({
            product:productId,
            user:userId,
            rating,
            comment,
        })
        const reviews=await Review.find({product:productId});
        // console.log("Product Reviews",reviews);
       
    const avgRating=reviews.length>0?
    Math.round((reviews.reduce((acc,cur)=>acc+cur.rating,0)/reviews.length)*10)/10
                            :0;
                        await products.findByIdAndUpdate(productId,{
                            rating:avgRating,
                            numReviews:reviews.length
                        });
                        res.status(200).json({
                            success:true,
                            message:"Review added successfully",
                            data:null
                        });
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}