// const mongodb=require('mongodb')
const Product = require('../models/product')
// const ObjectId=mongodb.ObjectId
exports.getAddProduct = (req, res, next) => {
    //这里是典型的controller logic  controller
    res.render('admin/edit-product',
        {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            editing: false
        })
}


exports.postAddProduct = (req, res, next) => {
    // products.push({title: req.body.title})  使用Model

    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(
        title,
        price,
        description,
        imageUrl,
        null,
        req.user._id
        )


    ;
    product
        .save()
        .then(result => {
            console.log('Created Product')
            res.redirect('/admin/products')
        })

}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit
    console.log('req.query')
    console.log(req.query)
    console.log('editMode')
    console.log(editMode)

    //如果不是编辑状态（editMode),重定向
    if (!editMode) {
        return res.redirect('/')
    }
    const prodId = req.params.productId

    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/')
            }
            res.render('admin/edit-product',
                {
                    pageTitle: 'Edit Product',
                    path: '/admin/edit-product',
                    editing: editMode,//可编辑状态
                    product: product
                })
        }).catch(err => {
        console.log(err)
    })


}


exports.postEditProduct = (req, res, next) => {
    //
    const prodId = req.body.productId
    const updatedTitle = req.body.title
    const upadatedImageUrl = req.body.imageUrl
    const updatedPrice = req.body.price
    const updatedDesc = req.body.description
    const upadatedProduct = new Product(
        updatedTitle,
        updatedPrice,
        updatedDesc,
        upadatedImageUrl,
        prodId
    )

    upadatedProduct.save()
        .then(result => {
            console.log('UPDATED PRODUCT!')
            res.redirect('/admin/products')
        })
        .catch(err => console.log(err))
    // res.redirect('/admin/products') //放在这里是不行的，因为上面是异步
}


exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then((products) => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products',
            });
        })

    // Product.findAll()
    // req.user.getProducts()
    //     .then(products => {
    //         res.render('admin/products', {
    //             prods: products,
    //             pageTitle: 'Admin Products',
    //             path: '/admin/products',
    //         });
    //     }).catch(err => {
    //     console.log(err)
    // })
}

// //删除Product

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    //删除
    Product.deleteById(prodId)
        .then(() => {
            console.log('DELETE PRODUCT SUCCESS')
            res.redirect('/admin/products')
        })
        .catch(err => console.log(err))
}
