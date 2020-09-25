const express=require('express')
const path=require('path')
const router=express.Router()

const products=[]

router.get('/add-product',(req,res,next)=>{
    console.log('In the middleware!')
    // res.sendFile(path.join(__dirname,'../','views','add-product.html'))
    res.render('add-product',{pageTitle:'Add Product',path:'/admin/add-product',formsCSS:true,productCSS:true,activeAddProduct:true})
});

//多级路由
// router.get('/admin/add-product',(req,res,next)=>{
//     console.log('In the middleware!')
//     res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Products</button></form>')
//
// });
router.post('/add-product',(req,res) =>{
    console.log(req.body)
    products.push({title:req.body.title})

    res.redirect('/')

})


// router.post('/admin/product',(req,res) =>{
//     console.log(req.body)
//     res.redirect('/')
//
// })


// module.exports=router

exports.routes=router
exports.products=products
