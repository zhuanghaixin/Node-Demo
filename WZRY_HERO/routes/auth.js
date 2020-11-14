//1.导入模块
const express = require('express')

//2.导入auth的controller
const authController = require('../controllers/auth')
//3.导入express.Router()类
const router=express.Router()


//3 配置路由
router.post('/user/register',authController.postSignup)

router.post('/user/login',authController.postLogin)

router.get('/logout',authController.getLogout)




//4 导出路由
module.exports =router
