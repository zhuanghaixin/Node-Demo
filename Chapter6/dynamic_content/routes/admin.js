const express=require('express')
const path=require('path')
const router=express.Router()

router.get('/add-product',(req,res,next)=>{
    console.log('In the middleware!')
    res.sendFile(path.join(__dirname,'../','views','add-product.html'))
});
//多级路由
// router.get('/admin/add-product',(req,res,next)=>{
//     console.log('In the middleware!')
//     res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Products</button></form>')
//
// });
router.post('/product',(req,res) =>{
    console.log(req.body)
    res.redirect('/')

})


// router.post('/admin/product',(req,res) =>{
//     console.log(req.body)
//     res.redirect('/')
//
// })


module.exports=router
