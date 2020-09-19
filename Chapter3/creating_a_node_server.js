const http=require('http')
const server=http.createServer((res,req)=>{
    console.log(res)
})

server.listen(3000)

