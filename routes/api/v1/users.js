const express=require('express');
const session  = require('passport');
const router=express.Router();

const usersApi=require('../../../controllers/api/v1/user_api');


router.post('/create-session',usersApi.createSession);


module.exports=router;