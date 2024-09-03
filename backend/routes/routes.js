const express=require('express');

const router=express.Router();

const userRoute=require('../controllers/userRoute');
const login = require('../controllers/userLogin');
const getUser = require('../controllers/userInfo');
const isLoggedin = require('../middleware/isLoggedin');
const logout = require('../controllers/logout');
const expense = require('../controllers/expenseController/expense');
const getExpense = require('../controllers/expenseController/getExpense');
const getUsers = require('../controllers/alluser');

//user
router.post('/register',userRoute);
router.post('/login',login);
router.post('/logout',logout);
router.get('/userprofile',isLoggedin,getUser);
router.get('/alluser',isLoggedin,getUsers);


// expense

router.post('/addexpense',isLoggedin,expense);
router.get('/get',isLoggedin,getExpense);

module.exports= router;