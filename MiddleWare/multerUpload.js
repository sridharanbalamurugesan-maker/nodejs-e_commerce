const multer=require('multer');
const fs = require('fs');
const path = require('path');

const createUploads=(folderName)=>{
    const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        const uploadPath=path.join(__dirname,'..',folderName);
        if(!fs.existsSync(uploadPath)){
            fs.mkdirSync(uploadPath,{recursive:true});
        }
        cb(null,uploadPath);
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'-'+file.originalname);
    }
})
     return multer({
    storage,
    fileFilter:(req,file,cb)=>{
        const filter=["image/jpeg","image/png","image/jpg","image/webp"];
        if(filter.includes(file.mimetype)){
            cb(null,true)
        }
        else{
            cb(new Error("only jpeg and png and webp are allowed"),false)
        }
    }
})
}

module.exports=createUploads;