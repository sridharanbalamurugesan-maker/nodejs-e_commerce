const monogo=require('mongoose')
 const roleSchema=new monogo.Schema({
    name:{
        type:String,
        required:true
    }
 })
 module.exports=monogo.model("Role",roleSchema);