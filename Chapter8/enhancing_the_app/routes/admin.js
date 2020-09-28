const products=[];

const express=require('express')
const path=require('path')

//获取adminController的路径
const adminController=require('../controllers/admin')


const router=express.Router()


// const products=[]

// /admim/add-prodct =>GET
router.get('/add-product',adminController.getAddtProduct);

// /admim/products =>GET
router.get('/products',adminController.getProducts);

// /admim/add-prodct =>POST

router.post('/add-product',adminController.postAddProduct);



module.exports=router

// exports.routes=router
// exports.products=products
