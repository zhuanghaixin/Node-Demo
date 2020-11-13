const express = require('express')

//获取authController的路径
const authController=require('../controllers/auth')
const router=express.Router()
router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignup);
router.post('/login', authController.postLogin);
router.post('/signup', authController.postSignup);
router.post('/logout', authController.postLogout);

module.exports = router
