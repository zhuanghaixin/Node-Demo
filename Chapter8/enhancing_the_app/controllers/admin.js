const Product=require('../models/product')
exports.getAddtProduct = (req, res, next) => {
    //这里是典型的controller logic  controller
    res.render('admin/add-product',
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

    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, imageUrl, description, price);
    product.save();//products.push(this)
    res.redirect('/');
}


exports.getProducts= (req, res, next) => {
    Product.fetchAll((products)=>{
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',
        });
    })
}
