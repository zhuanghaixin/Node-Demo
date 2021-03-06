const fs = require('fs');

const requestHandler = (req, res) => {
    // req 是一个 http.IncomingMessage 实例，它是可读流。
    // res 是一个 http.ServerResponse 实例，它是可写流。
    const url = req.url
    const method = req.method
    if (url === '/') {
        res.write('<html>')
        res.write('<head><meta charset="utf-8"/><title>Enter Message</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><input type="submit" value="提交"></form></body>')
        res.write('<html>')
        return res.end()
    }
    if (url === '/message' && method === 'POST') {
        const body = []
        // 如果添加了监听器，则可读流会触发 'data' 事件。
        req.on('data', (chunk) => {
            body.push(chunk);
            console.log(body)
        });
        // 'end' 事件表明整个请求体已被接收。
        //todo 需要加一个return req.on
        return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString() //the bus is now waiting in the bus stop,the buffer is out bus stop 必须变成字符串，所以toString()
            const message = parseBody.split('=')[0]
            console.log(parseBody)
            fs.writeFileSync('message.txt', message) //这段代码会在下面三行代码执行之后再执行 下面发送请求并不意味者上面代码不执行，他仍会执行，即使响应已经完事了
            res.statusCode = 302
            res.setHeader('Location', '/')
            return res.end()

        })
    }


    //上面（）={}只是注册，还没有执行，下面代码就执行了，后面才会执行，但已经太晚了
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title>My First Page</title></head>')
    res.write('<body><h1>Hello from my Node.js Server</h1></body>')
    res.write('<html>')
    res.end()

}


//导出 第一种
// module.exports=requestHandler

//第二种
// module.exports={
//     handler:requestHandler,
//     someText:'Some hard coded text'
// }


//第三种
// module.exports.handler=requestHandler;
// module.exports.someText='Some hard coded text'


//第四种
exports.handler = requestHandler;
exports.someText = 'Some hard coded text'