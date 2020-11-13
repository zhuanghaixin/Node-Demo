//登录的时候 保存用户信息
const User = require('../models/user')
//进入登录页面
exports.getLogin = (req, res, next) => {
    //得到的cookie是string类型
    // const isLoggedIn= req
    //     .get('Cookie')
    //     .split(';')[1]
    //     .split('=')[1]==='true'
    // console.log(typeof isLoggedIn)
    console.log(req.session)
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated:false
    });
}

//提交登录信息
exports.postLogin = (req, res, next) => {
    // req.isLoggedIn=true
    // 提交Cookie信息
    //使用express-session
    //session是存储在服务器中的
    User.findById("5fa758bb74e3c2152023e54d")
        .then(user => {
            console.log('user....')
            console.log(user)
            //session保存登录信息 包括用户信息
            req.session.isLoggedIn = true
            req.session.user=user
            res.redirect('/')
        })
        .catch(err => console.log(err))

}

//登出
exports.postLogout = (req, res,next) =>{
    //销毁session
    req.session.destroy((err)=>{
        console.log(err)
        res.redirect('/')
    })
}
