const User=require('../Models/User')
const Role=require('../Models/role')
const bcrypt=require("bcryptjs");
const mongoos=require('mongoose');
const jwt=require('jsonwebtoken');



exports.registerUser=async(req,res)=>{
    try {
        const {name,email,password,address,mobile}=req.body
        const checkUser=await User.findOne({email})
        if(checkUser){
           return res.status(409).json({
                success:false,
                message:"Already exist email",
                data:null
            })
        }
        const role= await Role.findById(new mongoos.Types.ObjectId('69e08e7c2d1e81b6cc670c3c'));
        // console.log("role data",role);
        if(!role)
        {
           return  res.status(400).json({
                success:false,
                message:"RoleId Not Found",
                data:null
            }) 
        }
            const hashedPassword=await bcrypt.hash(password,2);
            const user=await User.create({
                name:name,
                email:email,
                mobile:mobile,
                address:address,
                password:hashedPassword, 
                role:role._id
            })
             res.status(201).json({
                success:true,
                message:"Successfully Created",
                data:user
            })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}

exports.login=async(req,res)=>{
       try {
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
          return  res.status(404).json({message:"User not Found"})
        }
        const match=await bcrypt.compare(password,user.password)
        if(!match){
           return  res.status(401).json({message:"Password not match"})
        }
        const token=jwt.sign({id:user._id},"secretKey",{expiresIn:"10h"});
        res.json({
            success:true,
            message:"successfully Login",
            token,
            data:user
        })
       } catch (error) {
        res.status(500).json({message:error.message})
       }
} 

exports.getAllUser=async(req,res)=>{
    try {
        const userData=await User.find()
        if(!userData){
            res.status(400).json({
                success:false,
                message:"UserData not Fetch",
                data:null
            })
        }
        res.status(200).json({
            success:true,
            message:"successfully Fetched",
            data:userData,
        })
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

exports.blockUser=async(req,res)=>{
    try {
        const id=req.params.id;
        let blockedUser=await User.findById(id);
        console.log("blockedUser",blockedUser);
        if(!blockedUser){
          return  res.status(400).json({message:"User Not Found"});
        }
        blockedUser.isBlock=!blockedUser.isBlock;
        await blockedUser.save();
        res.status(200).json({
            success:true,
            message: blockedUser.isBlock? "User Blocked": "User Unblocked",
            data:null
        })
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}