const mongoos=require('mongoose');
const product=require('./product');
const categorySchema= new mongoos.Schema({
   name:{
    type:String,
    required:true
   },
   description:{
    type:String,
    required:true
   },
   image:{
    type:String,
    required:true
   }
})
 categorySchema.pre("findOneAndDelete",async function() {
    try {
        const doc=await this.model.findOne(this.getFilter());
        console.log("doc",doc);
        if (doc) {
      console.log("Deleting products of category:", doc._id);

      await product.deleteMany({ category: doc._id });
    }
    } catch (error) {
        console.log("error message",error);
    }
   })

module.exports=mongoos.model("Category",categorySchema); 