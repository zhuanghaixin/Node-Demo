const http=require('http');
const server=http.createServer((req,res)=>{
    const url=req.url
    if(url==='/'){
        res.write('<html>')
        res.write('<head><meta charset="utf-8"/><title>Enter Message</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><input type="submit" value="提交"></form></body>')
        res.write('<html>')
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
