// const products = [] 这里不要了,在Model中定义
const Product = require('../models/product')

//引入Order Model
const Order = require('../models/order')


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

    // Product.fetchAll((products) => {
    //     res.render('shop/product-list', {
    //         prods: products,
    //         pageTitle: 'All Products - Products',
    //         path: '/products',
    //     });
    // })

    // Product.fetchAll()
    Product.find()
        // .select('title price -_id')  //只选择title price 不要_id
        // .populate('userId')
        .then(products => {
            console.log('products--------------------------------')
            console.log(products)
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products - Products',
                path: '/products',
                isAuthenticated:  req.session.isLoggedIn
            });
        }).catch(err => {
        console.log(err)
    })
}


exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    console.log(prodId)  //5f84554c3ac90a4e3f24198c  而我们需要Object("5f84554c3ac90a4e3f24198c")


    Product.findById(prodId).then((product) => {
        console.log('product,,,,')
        console.log(product)
        res.render('shop/product-detail',
            {
                product: product,
                pageTitle: product.title,
                path: '/products',
                isAuthenticated:  req.session.isLoggedIn
            })
    }).catch(err => {
        console.log(err)
    })
}


exports.getIndex = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop - Index',
                path: '/',
                isAuthenticated:  req.session.isLoggedIn
            });
        }).catch(err => {
        console.log(err)
    })

    // Product.fetchAll().then(([rows,fieldData])=>{
    //     console.log('rows')
    //     console.log(rows)
    //     console.log('fieldData')
    //     console.log(fieldData)
    //     res.render('shop/index', {
    //         prods: rows,
    //         pageTitle: 'Shop - Index',
    //         path: '/',
    //     });
    // }).catch(err=>{
    //     console.log(err)
    // })

}

exports.getCart = (req, res, next) => {
    //得到购物车商品

    req.user
        .populate('cart.items.productId')
        .execPopulate()  //返回Promise
        .then(user => {
            console.log('--------------------------------products')
            console.log(user.cart.items)
            const products = user.cart.items
            res.render('shop/cart', {
                pageTitle: 'Your Cart',
                path: '/cart',
                products: products,
                isAuthenticated:  req.session.isLoggedIn

            })
        }).catch(err => {
        console.log(err)
    })
}


//在单件商品中添加购物车
exports.postCart = (req, res, next) => {
    const prodId = req.body.productId
    Product.findById(prodId).then(product => {
        return req.user.addToCart(product)

    }).then(result => {
        console.log(result)
        //提交后跳转
        res.redirect('/cart')
    })

    // let newQuantity = 1
    // let fetchedCart
    // req.user
    //     .getCart()
    //     .then(cart => {
    //         fetchedCart = cart //获取的单个购物车
    //         return cart.getProducts({where: {id: prodId}}) //购物出商品
    //     })
    //     .then(products => {
    //         let product //购物车单个商品
    //         if (products.length > 0) {
    //             product = products[0]
    //
    //         }
    //         //数量加1
    //
    //         if (product) {
    //             //...
    //             const oldQuantity = product.cartItem.quantity
    //             newQuantity = oldQuantity + 1;
    //             return product
    //         }
    //         return Product.findByPk(prodId)
    //
    //     })
    //     .then(product => {
    //         console.log('product.....')
    //         console.log(product)
    //         console.log('.........')
    //         console.log(fetchedCart)
    //         return fetchedCart.addProduct(product, {
    //             through: {quantity: newQuantity}
    //         })
    //     })
    //     .then(() => {
    //         res.redirect('/cart')
    //     })
    //     .catch(err => console.log(err))


}

//购物车中删除product
exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId
    req.user
        .removeFromCart(prodId)
        .then(result => {
            res.redirect('/cart')
        })
        .catch(err => {
            console.log(err)
        })

}


//提交订单
exports.postOrder = (req, res, next) => {

    req.user
        .populate('cart.items.productId')
        .execPopulate()  //返回Promise
        .then(user => {
            console.log('user...')
            console.log(user)
            const products = user.cart.items.map(i => {
                console.log('i...')
                console.log(i)
                return {

                    product: {...i.productId._doc},
                    quantity: i.quantity

                }
            })
            const order = new Order({
                user: {
                    name: req.user.name,
                    userId: req.user._id
                },
                products: products
            })
            return order.save()
        }).then(result => {
        //清空购物车
        req.user.clearCart()
    }).then(result => {

        res.redirect('/orders')

    }).catch(err => console.log(err));
};


exports.getOrders = (req, res, next) => {
    Order.find({'user.userId': req.user._id}).then(orders => {
        console.log('orders...')
        console.log(orders)
        res.render('shop/orders', {
            path: '/orders',
            pageTitle: 'Your Orders',
            orders: orders,
            isAuthenticated:  req.session.isLoggedIn
        });
    }).catch(err => console.log(err));
}
;
