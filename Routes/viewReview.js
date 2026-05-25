const express=require('express');
const { getProductReviews } = require('../Controller/viewReviewController');
const router=express.Router();

router.get("/get-all-review/:id", getProductReviews);

module.exports=router;