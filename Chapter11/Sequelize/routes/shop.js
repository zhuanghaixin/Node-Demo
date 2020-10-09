const express=require('express')
const path=require('path')

const shopController=require('../controllers/shop')


const router=express.Router()


router.get('/', shopController.getIndex );

router.get('/products',shopController.getProducts)

//动态路由
router.get('/products/:productId',shopController.getProduct)


//单件商品中添加购物车
router.post('/cart',shopController.postCart)

router.get('/cart',shopController.getCart)

//购物中删除item
router.post('/cart-delete-item',shopController.postCartDeleteProduct)

//提交订单
router.post('/create-order',shopController.postOrder)

router.get('/orders',shopController.getOrders)



module.exports=router
