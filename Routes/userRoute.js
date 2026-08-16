const express=require('express');
const userController=require('../Controller/userController');
const router=express.Router();
const validate=require('../MiddleWare/validation');
const registerDto = require('../Dto/registerDto');
const profileDto = require('../Dto/profileDto');
const auth = require('../MiddleWare/AuthValidate');
const createUploads = require('../MiddleWare/multerUpload');
const profileUpload=createUploads('profile');

router.post('/register',validate(registerDto),userController.registerUser);
router.post('/login',userController.login);
router.get('/get-all-users',auth,userController.getAllUser);
router.get('/get-profile',auth,userController.getProfile);
router.put('/update-profile',auth,profileUpload.single("image"),validate(profileDto),userController.updateProfile);
router.put('/block-user/:id',auth,userController.blockUser);
module.exports=router; 