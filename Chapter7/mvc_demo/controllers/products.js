// const products = [] 这里不要了,在Model中定义
const Product=require('../models/product')

exports.getAddtProduct = (req, res, next) => {
    //这里是典型的controller logic  controller
    res.render('add-product',
        {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            formsCSS: true,
            productCSS: true,
            activeAddProduct: true
        })
}


exports.postAddProduct = (req, res, next) => {
    // products.push({title: req.body.title})  使用Model
    const product=new Product(req.body.title)
    product.save(this)   //products.push(this)
    res.redirect('/')
}


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
        res.render('shop', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    })
}

