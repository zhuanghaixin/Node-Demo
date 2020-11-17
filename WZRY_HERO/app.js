//1.导入模块
//1.1 express
const express = require('express')
// 1.2 path
const path = require('path');
//2.创建服务器
const app = new express()
//3.托管静态资源
app.use(express.static(path.join(__dirname, 'www')))//3.1前端静态页面
app.use(express.static(path.join(__dirname, 'static')))  //3.2文件服务器

//4.配置中间价
//4.1 body-parser
const bodyParser = require('body-parser')

//4.2 cors
const cors = require('cors')

//4.3 express-uploaded
const fileUpload = require('express-fileupload')

//4.4.1 express-session
const session = require('express-session'); //导入express-session中间件

//4.4.2 cookie-session中间件：用户会话状态保持   给req添加session属性
const cookieSession = require('cookie-session');

//4.5 A MYSQL session 存储
// const MySQLStore = require('express-mysql-session')(session);
// const options = {
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: 'zhx199710085470',
//     database: 'wzry'
// };
// const  sessionStore = new MySQLStore(options);


// 使用中间件

//4.1
app.use(bodyParser.urlencoded({extended: false}))
//4.2
app.use(cors())
//4.3
app.use(fileUpload())


//4.4.1
// app.use(session({
//     key: 'session_cookie_name',
//     secret: 'session_cookie_secret',
//     store: sessionStore,
//     resave: false,
//     saveUninitialized: false
// }));
//4.4.2
// app.use(cookieSession({
//     name: 's_id',
//     keys: [/* secret keys */'a','b'],
//
//     // Cookie Options
//     maxAge: 7 * 24 * 60 * 60 * 1000 // 24 hours
// }));


//5.导入数据库
const sequelize = require('./utils/database')

//5.配置model


//6.配置路由

//6.1 英雄路由
const heroRoutes = require('./routes/hero')
//6.2 鉴权路由
const authRoutes = require('./routes/auth')

/* svg-captcha模块：生成验证码 */
var svgCaptcha = require('svg-captcha');

let captchaText = '';//全局变量存储验证码答案
//使用路由
app.use('/hero', heroRoutes)
// 验证码功能实现
//5.6 验证码
app.get('/captcha', (req, res) => {
    //(2)处理：
    let captcha = svgCaptcha.create({
        size: 4,
        noise: 2,
        color: true,
        background: '#f3d1ac'
    });
    // console.log(captcha);
    //分别获取文本 + 图片
    captchaText = captcha.text;
    console.log(captchaText)

    //(3)响应:
    res.type('svg');
    res.status(200).send(captcha.data);
});
//所有路由都可以访问
app.use((req, res, next) => {
        req.captchaText = captchaText
        next()
    }
)
//使用路由
app.use(authRoutes)


//6.x 404路由
const errorController = require('./controllers/error')
app.use(errorController.get404);

//7.开启服务器
app.listen(3000)

