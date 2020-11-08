const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

//引入mongoose
const mongoose = require('mongoose');

//引入error controller
const errorController = require('./controllers/error')

//引入User
const User=require('./models/user')
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');



const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

//使用中间件
app.use((req,res,next)=>{
    // User.findByPk(1)
    //     .then(user=>{
    //         req.user=user
    //         next()
    //     }).catch(err => console.log(err))
    User.findById("5fa758bb74e3c2152023e54d")
        .then(user=>{
            console.log(user)
            console.log('user....')
            req.user=user
            console.log('req.user....')
            console.log(req.user)
            next()
        })
        .catch(err => console.log(err))
})


app.use('/admin', adminRoutes);
app.use(shopRoutes);


app.use(errorController.get404);

//mongoose
mongoose.connect('mongodb+srv://zhuanghaixin:zhx199710085470@cluster0.wwisb.mongodb.net/shop?retryWrites=true&w=majority')
    .then(result=>{
        console.log('连接成功')
        User.findOne().then(user=>{
            if(!user){
                const user=new User({
                    name:'Zhx',
                    email:'649308293@qq.com',
                    cart:{
                        items:[]
                    }
                })
                user.save()
            }
        })
        app.listen(3000)
    }).catch(err=>{
    console.log('连接失败')
    console.log(err)
})




