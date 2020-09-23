const express=require('express')
const path=require('path')
const rootDir=require('../util/path')  //获取当前项目路径
const router=express.Router()

router.get('/',(req,res,next)=>{
    console.log('In the middleware!')
    // res.sendFile(path.join(rootDir,'views','shop.html'))
    res.render('shop')
});


module.exports=router
