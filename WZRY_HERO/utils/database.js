const Sequelize = require('sequelize')
//配置数据库
const sequelize=new Sequelize('wzry','root','zhx199710085470',
    {
        dialect: 'mysql',
        host:'localhost'
    })

module.exports =sequelize
