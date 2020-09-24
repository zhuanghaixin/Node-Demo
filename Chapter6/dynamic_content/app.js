const http=require('http');
const path=require('path')
const express=require('express')
const app=express()

//设置模版引擎
app.set('view engine','pug')
//设置解析路径
app.set('views','views')


const bodyParser=require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))  //req.body解析
app.use(express.static(path.join(__dirname,'public')))//静态路由

const adminData=require('./routes/admin')
const shopRoutes=require('./routes/shop')

app.use(shopRoutes)
//多级路由
app.use('/admin',adminData.routes)

app.use((req,res,next)=>{
    // res.status(404).sendFile(path.join(__dirname,'views','404.html'))
    res.status(404).render('404',{pageTitle:'Page Not Found'})
})





const server=http.createServer(app)



server.listen(3000)
