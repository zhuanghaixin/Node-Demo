const products=[];

const express=require('express')
const path=require('path')

//获取adminController的路径
const adminController=require('../controllers/admin')


const router=express.Router()


// const products=[]

// /admim/add-prodct =>GET
router.get('/add-product',adminController.getAddProduct);

// /admim/products =>GET
router.get('/products',adminController.getProducts);

// /admim/add-prodct =>POST

router.post('/add-product',adminController.postAddProduct);

//进入edit-product页面
router.get('/edit-product/:productId',adminController.getEditProduct)

//编辑后，提交edit-product
router.post('/edit-product',adminController.postEditProduct)

//删除Product
router.post('/delete-product',adminController.postDeleteProduct)

module.exports=router

// exports.routes=router
// exports.products=products
