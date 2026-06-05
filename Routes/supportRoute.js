const express=require('express');
const auth = require('../MiddleWare/AuthValidate');
const { createSupport } = require('../Controller/supportController');
const createUploads = require('../MiddleWare/multerUpload');
const supportUpload=createUploads('support');
const router=express.Router();

router.post('/create-ticket',auth,supportUpload.single("image"),createSupport);

module.exports=router;