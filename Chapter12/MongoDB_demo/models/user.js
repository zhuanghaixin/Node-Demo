// const Sequelize=require('sequelize')
//
// //引入数据库连接池
// const sequelize=require('../util/database')
//
// const User=sequelize.define('user',{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement:true,
//         allowNull:false,
//         primaryKey:true
//     },
//     name:Sequelize.STRING,
//     email:Sequelize.STRING
// })
// module.exports = User

const mongodb = require('mongodb')

const getDb = require('../util/database').getDb

const ObjectId = mongodb.ObjectId

class User {
    constructor(usernname, email, cart, id) {
        this.name = usernname
        this.email = email
        this.cart = cart  //{items:[]}
        this._id = id;
    }

    //保存
    save() {
        const db = getDb()
        return db
            .collection('users')
            .insertOne(this)


    }

    //添加购物车
    addToCart(product) {
        //如果购物车中有该商品
        const cartProductIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString() //这里都是object 所以不能用全等 ===
        })
        let newQuantity = 1
        const updatedCartItems = [...this.cart.items]
        if (cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1
            updatedCartItems[cartProductIndex].quantity = newQuantity
        } else {
            updatedCartItems.push({productId: new ObjectId(product._id), quantity: newQuantity})
        }
        //如果购物车中没有该商品
        // const updatedCart={items:[{productId:new ObjectId(product._id), quantity:1}]}
        // const updatedCart={items:[{...product, quantity:1}]}
        const updatedCart = {
            items: updatedCartItems
        }
        const db = getDb()
        return db
            .collection('users')
            .updateOne({_id: new ObjectId(this._id)}, {$set: {cart: updatedCart}})

    }

    getCart() {
        // return this.cart 返回所有的细节
        const db = getDb()
        //获取购物车商品的所有id
        console.log('this.cart........')
        console.log(this.cart)
        console.log('this.cart.items......')
        console.log(this.cart.items)
        const productIds = this.cart.items.map(i => {
            return i.productId
        })

        console.log('productIds.......')
        console.log(productIds)
        return db
            .collection('products')
            .find({_id: {$in: productIds}}) //找到包含id的所有商品
            .toArray()
            .then(products => {
                return products.map(p => {
                    return {
                        ...p,
                        quantity: this
                            .cart
                            .items
                            .find(i => {
                                return i.productId.toString() === p._id.toString()
                            }).quantity
                    }
                })
            })
    }

    //删除项目
    deleteItemFromCart(productId) {
        const updatedCartItems = this
            .cart
            .items
            .filter(item => {
                return item.productId.toString() !== productId.toString()
            })
        const db = getDb()
        return db
            .collection('users')
            .updateOne(
                {
                    _id: new ObjectId(this._id)
                },
                {
                    $set: {cart: {items: updatedCartItems}}
                }
            )
    }


    addOrder() {
        const db = getDb()
        //获取购物车的商品的price title
        return this.getCart().then(products => {
            //订单包括用户信息和商品数量/id
            const order = {
                items: products,
                user: {
                    _id: new ObjectId(this._id),
                    name: this.name
                }
            }
            return db
                .collection('orders')
                .insertOne(order)
        }).then(result => {
            this.cart = {items: []}  //清空购物车
            return db
                .collection('users')
                .updateOne(
                    {
                        _id: new ObjectId(this._id)
                    },
                    {
                        $set: {cart: {items: []}}

                    })
        })
    }

    //todo
    getOrders() {
        const db = getDb()
        return db
            .collection('orders')
            .find({'user._id':new ObjectId(this._id)})
            .toArray()
    }

    //查询
    static findById(userId) {
        const db = getDb()
        return db
            .collection('users')
            .findOne({_id: ObjectId(userId)})
            .then(user => {
                console.log('user......')
                console.log(user)
                return user
            })
            .catch(err => console.log(err))
    }
}


module.exports = User

