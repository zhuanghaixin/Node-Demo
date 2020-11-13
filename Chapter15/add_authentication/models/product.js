 const mongoose=require('mongoose')
const Schema=mongoose.Schema
const productsSchema=new Schema({
    title: {
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})
module.exports =mongoose.model('Product',productsSchema);



// const mongodb = require('mongodb')
// //引入MongoConnect 连接
// const getDb = require('../util/database').getDb
//
// class Product {
//     constructor(title, price, description, imageUrl, id,userId) {
//         this.title = title
//         this.price = price
//         this.description = description
//         this.imageUrl = imageUrl
//         this._id = id?new mongodb.ObjectId(id):null  //在添加product 如果不这么写，每次都有id在save()中运行不会执行第二个insertOne
//         this.userId=userId
//     }
//
//
//     //如果没有商品id就重新插入一个，如果有的话，就更新
//     save() {
//         const db = getDb()
//         let dbOp;
//         if (this._id) {
//             dbOp=db.collection('products').updateOne({_id:this._id},{$set:this})
//         }else{
//             // db.collection('products').insertOne({name:'A book',price:12.99})
//             dbOp=db.collection('products').insertOne(this) //插入的是变量
//
//         }
//         return dbOp
//             .then(result => {
//                 console.log(result)
//             })
//             .catch(err => console.log(err))
//
//     }
//
//     //获取所有对象
//     static fetchAll() {
//         const db = getDb()
//         return db.collection('products')
//             .find()
//             .toArray()
//             .then(products => {
//                 console.log(products)
//                 return products
//             })
//             .catch(err => console.log(err))
//     }
//
//     //获取单个商品
//     static findById(prodId) {
//         const db = getDb()
//         return db.collection('products')
//             .find({_id: mongodb.ObjectId(prodId)})  // //5f84554c3ac90a4e3f24198c  而我们需要Object("5f84554c3ac90a4e3f24198c")
//             .next()
//             .then(product => {
//                 console.log('profuct....')
//                 console.log(product)
//                 return product
//             })
//             .catch(err => console.log(err))
//     }
//
//     //删除商品
//     static deleteById(prodId){
//         const db=getDb()
//         return db.collection('products')
//             .deleteOne({
//                 _id:new mongodb.ObjectId(prodId)
//             })
//             .then(result=>{
//                 console.log('Deleted')
//             })
//             .catch(err => console.log(err))
//     }
// }
//
//
// module.exports = Product
//
