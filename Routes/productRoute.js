const express=require('express');
const auth = require('../MiddleWare/AuthValidate');
const upload = require('../MiddleWare/multerUpload');
const { createProduct, getAllProducts, editProduct, deleteProduct, productView } = require('../Controller/productController');
const createUploads = require('../MiddleWare/multerUpload');
const productUpload=createUploads('product');
const router=express.Router();

router.post("/create-product",auth,productUpload.single("image"),createProduct);
router.get("/get-all-product",auth,getAllProducts);
router.put("/product-edit/:id",auth,productUpload.single("image"),editProduct);
router.delete("/product-delete/:id",auth,deleteProduct);
router.get('/product-view/:id',auth,productView);
module.exports=router;