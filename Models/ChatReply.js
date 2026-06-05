const mongoose=require('mongoose');
const chatSchema=new mongoose.Schema({
    ticketId:{
        type:String,
        ref:"SupportSchema",
        required:true,
    },
    sender:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  message:{
    type:String,
    required:true,
  },
  attachment:{
    type:String,
    default: null,
  },
  isAdmin:{
    type:Boolean,
    default:false,
  },
},{timestamps:true});
module.exports=mongoose.model("ChatReply",chatSchema);