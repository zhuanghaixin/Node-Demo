// const products = [] 这里不要了,在Model中定义
const Product=require('../models/product')




exports.getProducts = (req, res, next) => {
    //这里是典型的controller logic  controller
    // const products = adminData.products;
    //获取所有的product fetchAll
    // const products=Product.fetchAll()
    // res.render('shop', {
    //     prods: products,
    //     pageTitle: 'Shop',
    //     path: '/',
    //     hasProducts: products.length > 0,
    //     activeShop: true,
    //     productCSS: true
    // });

    //todo 我们使用回调函数进行改写
    Product.fetchAll((products)=>{
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products - Products',
            path: '/products',
        });
    })
}

exports.getIndex= (req, res, next) => {
    Product.fetchAll((products)=>{
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop - Index',
            path: '/',
        });
    })
}

exports.getCart= (req, res, next) => {
    res.render('shop/cart',{
        pageTitle: 'Your Cart',
        path:'/cart'
    })
}


exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout',{
        pageTitle: 'Checkout',
        path:'/checkout'
    })
}


exports.getOrders= (req, res, next) => {
    res.render('shop/orders',{
        pageTitle: 'Orders',
        path:'/orders'
    })
}
