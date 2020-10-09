// const products = [] 这里不要了,在Model中定义
const Product = require('../models/product')




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

    Product.findAll()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products - Products',
                path: '/products',
            });
        }).catch(err => {
        console.log(err)
    })

}


exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;

    //todo 第一种方法
    Product.findByPk(prodId)
        .then(product => {
            console.log('product,,,,')
            console.log(product)
            res.render('shop/product-detail',
                {
                    product: product,
                    pageTitle: product.title,
                    path: '/products'
                })
        }).catch(err => {
        console.log(err)
    })
    //todo 第二种方法
    // Product.findAll({where:{id:prodId}})
    //     .then(products => {
    //         console.log('product,,,,')
    //         console.log(products)
    //         console.log(products[0])
    //         res.render('shop/product-detail',
    //             {
    //                 product: products[0],
    //                 pageTitle: products[0].title,
    //                 path: '/products'
    //             })
    //     }).catch(err => {
    //     console.log(err)
    // })

    // Product.findById(prodId).then(([product]) => {
    //     console.log('product,,,,')
    //     console.log(product)
    //     res.render('shop/product-detail',
    //         {
    //             product: product[0],
    //             pageTitle: product[0].title,
    //             path: '/products'
    //         })
    // }).catch(err => {
    //     console.log(err)
    // })
}


exports.getIndex = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop - Index',
                path: '/',
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
    req.user.getCart()
        .then(cart => {
            console.log(cart)
            return cart
                .getProducts()
                .then(products => {
                    console.log('products...')
                    console.log(products)
                    res.render('shop/cart', {
                        pageTitle: 'Your Cart',
                        path: '/cart',
                        products: products

                    })
                }).catch(err => console.log(err))
        }).catch(err => {
        console.log(err)
    })
}

//在单件商品中添加购物车
exports.postCart = (req, res, next) => {
    const prodId = req.body.productId

    let newQuantity = 1
    let fetchedCart
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart //获取的单个购物车
            return cart.getProducts({where: {id: prodId}}) //购物出商品
        })
        .then(products => {
            let product //购物车单个商品
            if (products.length > 0) {
                product = products[0]

            }
            //数量加1

            if (product) {
                //...
                const oldQuantity = product.cartItem.quantity
                newQuantity = oldQuantity + 1;
                return product
            }
            return Product.findByPk(prodId)

        })
        .then(product => {
            console.log('product.....')
            console.log(product)
            console.log('.........')
            console.log(fetchedCart)
            return fetchedCart.addProduct(product, {
                through: {quantity: newQuantity}
            })
        })
        .then(() => {
            res.redirect('/cart')
        })
        .catch(err => console.log(err))


}

//购物车中删除product
exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId
    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts({where: {id: prodId}})
        })
        .then(products => {
            const product = products[0]
            return product.cartItem.destroy()

        })
        .then(result => {
            res.redirect('/cart')
        })
        .catch(err => {
            console.log(err)
        })

}



//提交订单
exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts();
        })
        .then(products => {
            return req.user
                .createOrder()
                .then(order => {
                    console.log('order.......')
                    console.log(order)
                    return order.addProducts(
                        products.map(product => {
                            product.orderItem = { quantity: product.cartItem.quantity };
                            return product;
                        })
                    );
                })
                .catch(err => console.log(err));
        })
        .then(result => {
            console.log('------------------')
            return fetchedCart.setProducts(null);
        })
        .then(result => {
            res.redirect('/orders');
        })
        .catch(err => console.log(err));
};


exports.getOrders = (req, res, next) => {
    req.user
        .getOrders({include: ['products']})
        .then(orders => {
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orders
            });
        })
        .catch(err => console.log(err));
};
