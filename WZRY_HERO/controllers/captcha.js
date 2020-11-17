//导入svgCaptcha
const svgCaptcha = require('svg-captcha');
//声明全局变量存储验证码问题 （用于客户端验证）
let captchaText=''
exports.getCaptcha = (req, res, next) => {
    //1.创建验证码对象
    const captcha = svgCaptcha.create({
        size:4,
        noise:2,
        color:true,
        background: '#ffeeb3'
    });
    //2.获取验证码文本并保存
    captchaTxt = captcha.text;
    console.log(captcha.text);
    //3.将验证码图片响应给客户端
    res.type('svg');
    res.status(200).send(captcha.data);

}
