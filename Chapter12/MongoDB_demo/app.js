const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

//引入error controller
const errorController = require('./controllers/error')
//引入mongoDB 连接
const mongoConnect=require('./util/database').mongoConnect
// const mongoConnect = require('./util/database');

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
    console.log(User)
    User.findById("5f866a9afe917774df4712f6")
        .then(user=>{
            req.user=new User(user.name,user.email,user.cart,user._id)
            console.log(1)
            next()
        })
        .catch(err => console.log(err))
})


app.use('/admin', adminRoutes);
app.use(shopRoutes);


app.use(errorController.get404);

//mongoDB
mongoConnect(()=>{

    app.listen(3000)
})
// mongoConnect(client => {
//     console.log(client);
//     app.listen(3000);
// });




