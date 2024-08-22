const express=require('express');

const router=express.Router();

const userRoute=require('../controllers/userRoute');
const login = require('../controllers/userLogin');
const getUser = require('../controllers/userInfo');

router.post('/register',userRoute);
router.post('/login',login);
router.get('/user',getUser);

module.exports= router;