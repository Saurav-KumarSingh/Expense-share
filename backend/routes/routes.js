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
const deleteExpense = require('../controllers/expenseController/deleteExpense');
const updateExpense = require('../controllers/expenseController/updateExpense');
const getSingleExpense = require('../controllers/expenseController/getOneexpense');

//user
router.post('/register',userRoute);
router.post('/login',login);
router.post('/logout',logout);
router.get('/userprofile',isLoggedin,getUser);
router.get('/alluser',isLoggedin,getUsers);


// expense

router.post('/expense',isLoggedin,expense);
router.put('/expense/:expenseId',isLoggedin,updateExpense);
router.get('/expense',isLoggedin,getExpense);
router.delete('/delete/:id',isLoggedin,deleteExpense)
router.get('/expense/:expenseId', getSingleExpense);
module.exports= router;