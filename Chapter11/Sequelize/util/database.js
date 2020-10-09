const Sequelize=require('sequelize')
const sequelize=new Sequelize('node-complete','root','zhx199710085470',
    {
        dialect:'mysql',
        host:'localhost'
    })


module.exports=sequelize
