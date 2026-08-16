const express=require('express');
const auth = require('../MiddleWare/AuthValidate');
const upload = require('../MiddleWare/multerUpload');
const { createProduct, getAllProducts, editProduct, deleteProduct, productView, getProduct, getProductByFilter, addReview, getMyReview } = require('../Controller/productController');
const createUploads = require('../MiddleWare/multerUpload');
const productUpload=createUploads('product');
const reviewUpload=createUploads('review');
const router=express.Router();

router.post("/create-product",auth,productUpload.single("image"),createProduct);
router.get("/get-all-product",auth,getAllProducts);
router.put("/product-edit/:id",auth,productUpload.single("image"),editProduct);
router.delete("/product-delete/:id",auth,deleteProduct);
router.get('/product-view/:id',auth,productView);
router.get('/filter-products',auth,getProductByFilter);
router.post('/post-review/:id',auth,reviewUpload.array("images",5),addReview);
router.get('/get-review/:id',auth,getMyReview);
module.exports=router;