//1.引入Sequelize模块
const Sequelize= require('sequelize')
//2.引入数据库连接池
const sequelize = require('../utils/database')
const Hero=sequelize.define('hero',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull: false
    },
    icon:{
        type:Sequelize.STRING,
        allowNull: false
    },
    skill:{
        type:Sequelize.STRING,
        allowNull: false
    }
})

module.exports =Hero
