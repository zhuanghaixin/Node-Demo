const products=[];

const express=require('express')
const path=require('path')

//获取prodcutsController的路径
const productsController=require('../controllers/products')


const router=express.Router()


// const products=[]

// /admim/add-prodct =>GET
router.get('/add-product',productsController.getAddtProduct);

// /admim/add-prodct =>POST

router.post('/add-product',productsController.postAddProduct);



module.exports=router

// exports.routes=router
// exports.products=products
