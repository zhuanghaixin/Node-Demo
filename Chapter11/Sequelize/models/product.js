const Sequelize=require('sequelize')

//引入数据库连接池
const sequelize=require('../util/database')

const Product=sequelize.define('product',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    title:Sequelize.STRING,
    price:{
        type:Sequelize.DOUBLE,
        allowNull:false
    },
    imageUrl:{
        type:Sequelize.STRING,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

// //通过Model将数据存储在数据库database中
// const db=require('../util/database')
//
// //这里不需要fs,path模块，因为我们不再用file工作 增删改查
// // const fs = require('fs')
// // const path = require('path')
//
//
// const Cart=require('./cart')
//
//
//
//
// // const products = [] 这里我们不用数组存储了
// module.exports = class Product {
//     constructor(id, title, imageUrl, description, price) {
//         this.id = id;
//         this.title = title;
//         this.imageUrl = imageUrl;
//         this.description = description;
//         this.price = price;
//     }
//
//     //保存数据
//     save() {
//       return   db.execute('INSERT INTO products (title, description, price,imageUrl) VALUES (?, ?, ?, ?)', [this.title, this.description, this.price,this.imageUrl]);
//
//     }
//
//
//
//     //删除数据
//    static deleteById(id){
//
//     }
//
//
//
//     //获取所有数据
//     static fetchAll(callback) {
//        return  db.execute('SELECT * FROM products')
//     }
//
//     //获取单个商品的数据
//     static findById(id) {
//         return db.execute('SELECT * FROM products WHERE products.id=?',[id])
//     }
// }
