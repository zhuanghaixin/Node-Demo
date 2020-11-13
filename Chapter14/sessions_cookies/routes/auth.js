const express = require('express')

//获取authController的路径
const authController=require('../controllers/auth')
const router=express.Router()

router.get('/login',authController.getLogin)
router.post('/login',authController.postLogin)
router.post('/logout',authController.postLogout)

module.exports = router
