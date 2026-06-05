const mongoose=require('mongoose');
const { type } = require('../Dto/registerDto');
const supportSchema=new mongoose.Schema({
     user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
      },
    ticketId:{
        type:String,
        required:true,
      },
    subject:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    image:{
        type:String,
    }
},{timestamps:true});
module.exports=mongoose.model("SupportSchema",supportSchema);