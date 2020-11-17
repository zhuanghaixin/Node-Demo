//1导入模块
//1.1 express
const express=require('express')



//2 导入captcha controller
const captchaController=require('../controllers/captcha')


//3 导入express.Router()类
const router=express.Router()

// 4.配置路由
router.get('/captcha',captchaController.getCaptcha)

// 5.导出路由
module.exports=router
