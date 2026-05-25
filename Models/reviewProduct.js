const mongoose=require('mongoose');
const reviewSchema=new mongoose.Schema({
  product:{
    type:mongoose.Schema.ObjectId,
    ref:"Product",
    required:true
  },
  user:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true
  },
  rating:{
    type:Number,
    required:true
  },
  comment: {
   type: String
},

},{timestamps:true});
module.exports=mongoose.model("ReviewProduct",reviewSchema);
