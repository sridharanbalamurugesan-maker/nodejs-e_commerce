const express=require('express')
const upload=require('../MiddleWare/multerUpload');
const {createCategory, getAllCategory, getCategoryOption, editCategory, deleteCategory}=require('../Controller/categoryController');
const auth = require('../MiddleWare/AuthValidate');
const createUploads = require('../MiddleWare/multerUpload');
const categoryUpload=createUploads('category');
const router=express.Router();

router.post("/create-category",auth,categoryUpload.single("image"),createCategory);
router.get("/get-all-categories",auth,getAllCategory);
router.get("/get-category-options",auth,getCategoryOption);
router.put("/category-edit/:id",auth,categoryUpload.single("image"),editCategory);
router.delete("/delete-category/:id",deleteCategory);
module.exports=router;