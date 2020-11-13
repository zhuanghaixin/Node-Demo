const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session'); //导入express-session中间件
const MongoDBStore = require('connect-mongodb-session')(session) //导入mongoDB session存储
//初始化store
const MONGODB_URI = 'mongodb+srv://zhuanghaixin:zhx199710085470@cluster0.wwisb.mongodb.net/shop?retryWrites=true&w=majority'
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'mySessions'
});

//引入mongoose
const mongoose = require('mongoose');

//引入error controller
const errorController = require('./controllers/error')

//引入User
const User = require('./models/user')
const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


//使用express-session
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,  // 设置false适合登录sesssion
    store: store
    // cookie: { secure: true }
}))

//重新添加user中间件 每次都能获取user
app.use((req, res, next) => {

    //登出的时候，会报错 Cannot read property '_id' of undefined
    if(!req.session.user){
      return   next()
    }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user
            next()  //下一个中间件函数
        })
        .catch(err => console.log(err))
})


app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);


app.use(errorController.get404);

//mongoose
mongoose.connect(MONGODB_URI)
    .then(result => {
        console.log('连接成功')
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'Zhx',
                    email: '649308293@qq.com',
                    cart: {
                        items: []
                    }
                })
                user.save()
            }
        })
        app.listen(3000)
    }).catch(err => {
    console.log('连接失败')
    console.log(err)
})




