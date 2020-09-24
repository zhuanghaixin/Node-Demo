const express=require('express')
const path=require('path')
const rootDir=require('../util/path')  //获取当前项目路径
const router=express.Router()
//获取admin的数据
const adminData=require('./admin')

router.get('/',(req,res,next)=>{
    console.log('In the middleware!')
    // res.sendFile(path.join(rootDir,'views','shop.html'))
    console.log('shop.js' ,adminData.products)
    const products=adminData.products
    res.render('shop',{prods:products,docTitle:'Shop',path:'/'})
});


module.exports=router
