const mongoos=require('mongoose')
const userSchema=new mongoos.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:""
    },
    role:{
       type:mongoos.Schema.Types.ObjectId,
       ref:"Role",
       required:true
    },
    isBlock:{
        type:Boolean,
        default:false
    },
    resetToken: {
       type: String
    },

resetTokenExpire: {
      type: Date
    },
    createAt:{
        type:Date,
        default:Date.now()
    }
});
module.exports=mongoos.model("User",userSchema);