const http=require('http');

const express=require('express')

const app=express()

app.use('/',(req,res,next)=>{
    console.log('THIS IS AWAYS RUN!')

    next()
});
app.use('/add-product',(req,res,next)=>{
    console.log('In the middleware!')
    res.send('<h1>The "Add Product" Page </h1>')

});


app.use('/',(req,res,next)=>{
    console.log('In the middleware!')
    res.send('<h1>Hello from express</h1>')
});


app.use('/user',(req,res,next)=>{
    console.log('another middleware!')
    res.end('<h1>Hello from Expert</h1>')
});

const server=http.createServer(app)



server.listen(3000)
