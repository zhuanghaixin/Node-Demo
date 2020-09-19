const http=require('http');
const fs=require('fs');
const server=http.createServer((req,res)=>{
    // req 是一个 http.IncomingMessage 实例，它是可读流。
    // res 是一个 http.ServerResponse 实例，它是可写流。
    const url=req.url
    const method=req.method
    if(url==='/'){
        res.write('<html>')
        res.write('<head><meta charset="utf-8"/><title>Enter Message</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><input type="submit" value="提交"></form></body>')
        res.write('<html>')
        return res.end()
    }
    if(url==='/message'&& method==='POST'){
        const body=[]
        // 如果添加了监听器，则可读流会触发 'data' 事件。
        req.on('data', (chunk) => {
            body.push(chunk);
            console.log(body)
        });
        // 'end' 事件表明整个请求体已被接收。
        req.on('end',()=>{
            const parseBody=Buffer.concat(body).toString() //the bus is now waiting in the bus stop,the buffer is out bus stop 必须变成字符串，所以toString()
            const message=parseBody.split('=')[1]
            console.log(parseBody)
            fs.writeFileSync('message.txt',message)
        })

        res.statusCode=302
        res.setHeader('Location','/')
        return res.end()

    }
    res.setHeader('Content-Type', 'text/html，charset=utf-8')
    res.write('<html>')
    res.write('<head><title>My First Page</title></head>')
    res.write('<body><h1>Hello from my Node.js Server</h1></body>')
    res.write('<html>')
    res.end()

})
server.listen(3000)
