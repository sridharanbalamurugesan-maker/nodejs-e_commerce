const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    stocks:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    brand:{
        type:String,
        required:true,
    },
    numReviews:{
        type:Number,
        default:0,
    },
    rating: {
     type: Number,
     default: 0
     },
    isFreeShipping:{
        type:Boolean,
        default:false,
    },
    image:{
        type:String,
        required:true
    }
},{timestamps:true})
module.exports=mongoose.model("Product",productSchema);