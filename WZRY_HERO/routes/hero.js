//1导入模块
//1.1 express
const express=require('express')



//2 导入hero controller
const heroController=require('../controllers/hero')


//3 导入express.Router()类
const router=express.Router()

//4 配置各种路由
router.get('/list',heroController.getHeroList)

router.get('/info',heroController.getHeroInfo)

router.post('/update',heroController.updateHero)

router.post('/delete',heroController.deleteHero)

router.post('/add',heroController.addHero)

//5 导出路由
module.exports = router;
