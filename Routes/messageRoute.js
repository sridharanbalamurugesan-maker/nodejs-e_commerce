const express=require('express');
const auth = require('../MiddleWare/AuthValidate');
const {getMessages, sentMessage, updateTicketStatus } = require('../Controller/messageController');
const createUploads = require('../MiddleWare/multerUpload');
const attachment=createUploads('attachment');
const router=express.Router();

router.post('/post-message/',auth,attachment.single('attachment'),sentMessage)
router.get('/get-all-message/:id',auth,getMessages);
router.put("/ticket-status/:id",auth,updateTicketStatus);
module.exports=router;