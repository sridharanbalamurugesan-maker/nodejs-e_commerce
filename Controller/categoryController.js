const { message } = require('../Dto/registerDto');
const Categorys = require('../Models/Categorys');

exports.createCategory=async(req,res)=>{
    try {
        const{name,description}=req.body;
        if(!req.file){
            return res.status(400).json({message:"Image required"})
        }
        const newCategory=await Categorys.create({
            name,
            description,
            image:`category/${req.file.filename}`
        });
        res.status(201).json({
            success:true,
            message:"Upload successfully",
            data:newCategory
        })
    } catch (error) {
        res.status(500).json({message:error.message});
    }

}
exports.getAllCategory=async(req,res)=>{
    try {
        const allCategory=await Categorys.find();
        res.status(200).json({
            success:true,
            message:"successfully fetch",
            data:allCategory
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message,
        data:null});
    }
}

exports.getCategoryOption=async(req,res)=>{
        try {
            const data=await Categorys.find();
            const option=data.map((cat)=>({
                id:cat._id,
                name:cat.name
            }))
            res.status(200).json({
                success:true,
                message:"success",
                data:option
            })
        } catch (error) {
            console.error(error.message);
          res.status(500).json({
          success: false,
           message: error.message
            });
        }
}

exports.editCategory=async(req,res)=>{
    try {
        const id=req.params.id;
        const updateData={
            name:req.body.name,
            description:req.body.description
        };
        if(req.file){
            updateData.image=`category/${req.file.filename}`;
        }
        const data= await Categorys.findByIdAndUpdate(id,updateData,{new:true});
        console.log("editCategory",data);
        if(!data){
            res.status(400).json({message:"id not found"});
        }
        res.status(200).json({
            success:true,
            message:"successfully find id",
            data:data
        })
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

exports.deleteCategory=async(req,res)=>{
    try {
        const id=req.params.id;
        const deleteCategory=await Categorys.findByIdAndDelete(id);
        if(!deleteCategory){
            res.status(400).json({message:"category id not found"})
        }
        res.status(200).json({
            success:true,
            message:"successfully Deleted",
            data:null
        });
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}