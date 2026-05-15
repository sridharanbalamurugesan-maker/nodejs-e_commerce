const mongoos=require('mongoose')
const connectDb=async()=>{
    try {
        await mongoos.connect("mongodb://localhost/Products");
        console.log("Db connected");
    } catch (error) {
        console.log("connection failed",error.message);
    }
}
module.exports=connectDb;