const express=require('express');
const auth = require('../MiddleWare/AuthValidate');
const { getAllTicket, adminTicket } = require('../Controller/ticketController');
const router=express.Router();

router.get('/my-ticket',auth,getAllTicket);
router.get('/all-ticket',auth,adminTicket);

module.exports=router;