// const products = [] 这里不要了,在Model中定义
const Product=require('../models/product')

//Card Model
const Cart=require('../models/cart')


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


exports.getProduct= (req, res, next) => {
    const prodId=req.params.productId;
    console.log('prodId')
    console.log(prodId)
    console.log('Product.findById(prodId)')

    Product.findById(prodId).then(([product])=>{
        console.log('product,,,,')
        console.log(product)
        res.render('shop/product-detail',
            {
                product:product[0],
                pageTitle: product[0].title,
                path:'/products'
            })
    }).catch(err=>{
        console.log(err)
    })
}


exports.getIndex= (req, res, next) => {
    Product.fetchAll().then(([rows,fieldData])=>{
        console.log('rows')
        console.log(rows)
        console.log('fieldData')
        console.log(fieldData)
        res.render('shop/index', {
            prods: rows,
            pageTitle: 'Shop - Index',
            path: '/',
        });
    }).catch(err=>{
        console.log(err)
    })

}

exports.getCart= (req, res, next) => {
    //得到购物车商品
    Cart.getCart(cart=>{
        console.log('cart...') //{ products: [ { id: '0.6776361776486544', qty: 1 } ], totalPrice: 100 }

        console.log(cart)
        Product.fetchAll(products=>{
            const cartProducts=[]
            for(product of products){
            const cartProductData = cart.products.find(prod=>prod.id===product.id)
                console.log('cartProductData...')
                console.log(cartProductData) //{ id: '0.6776361776486544', qty: 1 }

                if(cartProductData){
                    cartProducts.push({productData:product,qty:cartProductData.qty})
                    console.log('cartProducts...')
                    console.log(cartProducts)
                }
            /* cardProducts
            [
  {
    productData: {
      id: '0.6776361776486544',
      title: '前端开发',
      imageUrl: 'https://cdn.pixabay.com/photo/2016/03/31/20/51/book-1296045_960_720.png',
      description: 'sdkflsnfoln.',
      price: '100'
    },
    qty: 1
  }
]

             */
            }
            res.render('shop/cart',{
                pageTitle: 'Your Cart',
                path:'/cart',
                products:cartProducts

            })
        })

    })
}

//在单件商品中添加购物车
exports.postCart=(req,res,next)=>{
    const prodId=req.body.productId
    console.log('prodId...')
    console.log(prodId)
    //获取单个商品的数据
    Product.findById(prodId,(product)=>{
        Cart.addProduct(prodId,product.price)
    })
    res.redirect('/cart')

}

//购物车中删除product
exports.postCartDeleteProduct=(req,res,next)=>{
    console.log(req.body)
    const prodId=req.body.productId
    console.log('proId postCardDeleteProduct...')
    console.log(prodId)
    Product.findById(prodId,product=>{
        Cart.deleteProduct(prodId,product.price)
        res.redirect('/cart')
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
