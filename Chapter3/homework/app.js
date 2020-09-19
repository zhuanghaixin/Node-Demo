const http = require('http')

const server = http.createServer((req, res) => {
    const url = req.url
    const method = req.method
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<head><meta charset="utf-8"/><title>Greeting Text</title></head>')
        res.write('<body><p>Hello world</p><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Submit</button></form></body>')
        res.write('<html>')
        return res.end()
    }
    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<head><meta charset="utf-8"/><title>Greeting Text</title></head>')
        res.write('<body><ul><li>User 1</li><li>User 2</li></ul></body>')
        res.write('<html>')
        return res.end()
    }
    if (url === '/create-user' && method === 'POST') {
        console.log(11111)
        const body = []
        req.on('data', (chunk) => {
            console.log(333)
            body.push(chunk)

            console.log(body)
            console.log(222)
        })
        return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString()
            console.log(parseBody)
            console.log(parseBody.split('=')[1])
            res.statusCode = 302
            res.setHeader('Location', '/')
            return res.end()

        })

    }

})

server.listen(3000)


