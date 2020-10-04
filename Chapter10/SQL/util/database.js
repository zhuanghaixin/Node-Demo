const mysql=require('mysql2')
const pool=mysql.createPool({
    host: 'localhost',
    user:'root',
    database:'node-complete',
    password:'zhx199710085470'
})
module.exports=pool.promise()
