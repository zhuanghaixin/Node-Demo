const Product = require('../models/product')
exports.getAddProduct = (req, res, next) => {
    //这里是典型的controller logic  controller
    res.render('admin/edit-product',
        {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            editing:false
        })
}


exports.postAddProduct = (req, res, next) => {
    // products.push({title: req.body.title})  使用Model

    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null,title, imageUrl, description, price);
    product.save();//products.push(this)
    res.redirect('/');
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
    Product.findById(prodId, product => {
        if(!product){
            return res.redirect('/')
        }
        res.render('admin/edit-product',
            {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,//可编辑状态
                product:product
            })
    })


}


exports.postEditProduct= (req, res, next) => {
    //
    const prodId=req.body.productId
    const updatedTitle=req.body.title
    const upadatedImageUrl=req.body.imageUrl
    const updatedPrice=req.body.price
    const updatedDesc=req.body.description
    const upadatedProduct=new Product(
        prodId,
        updatedTitle,
        upadatedImageUrl,
        updatedDesc,
        updatedPrice
    )
    upadatedProduct.save()
    res.redirect('/admin/products')
}


exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',
        });
    })
}

//删除Product

exports.postDeleteProduct =(req,res,next)=>{
    const prodId=req.body.productId;
    //删除
    Product.deleteById(prodId)
    res.redirect('/admin/products')
}
