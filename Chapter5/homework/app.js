const http=require('http')


const express =require('express')
const app=express()
const server=http.createServer(app)

app.use('/user',(req,res,next)=> {
    console.log('234')
    res.send('<h1>user</h1>')
    // next()
})
app.use('/',(req,res,next)=>{
    console.log('123')
    res.send('<h1>首页</h1>')
    // next()
})





server.listen(3000)

