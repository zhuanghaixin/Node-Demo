const fs = require('fs')
const path = require('path')

const p = path.join(
    path.dirname(process.mainModule.filename),
        'data',
        'cart.json'
    )

module.exports = class Cart {
    //传入id和productPrice
    static addProduct(id, productPrice) {
        //Fetch the previous cart 获取以前的购物车
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0}
            if (!err) {
                cart = JSON.parse(fileContent)
            }
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id)
            const existingProduct = cart.products[existingProductIndex]
            let upadatedProduct
            //如果存在商品，则添加数量。否则
            if (existingProduct) {
                upadatedProduct = {...existingProduct} //复制对象
                upadatedProduct.qty = upadatedProduct.qty + 1 //数量➕1
                cart.products = [...cart.products] //复制
                cart.products[existingProductIndex] = upadatedProduct
            } else {
                upadatedProduct = {id: id, qty: 1,} //否则添加新的对象
                cart.products = [...cart.products, upadatedProduct]
            }

            cart.totalPrice = +cart.totalPrice + +productPrice
            //写入cart.json
            fs.writeFile(p,JSON.stringify(cart), (err)=>{
                console.log('err')
                console.log(err)
            })

        })
        //Analyze the cart=>Find exsiting product 分析购物车，存在的商品
        //Add new product/increase  添加商品/添加数量
    }

    //一个应用只有一个购物车，而不是每次重新创建一个
    // constructor(){
    //     this.products=[]
    //     this.totalPrice=0;
    //
    // }


    //删除购物车商品
    static deleteProduct(id,productPrice){
        //读取文件
        fs.readFile(p, (err, fileContent) => {
            if(err){
                return
            }
            //更新购物车
            const updatedCart={...JSON.parse(fileContent)}  //找到要删的Product
            const product=updatedCart.products.find(prod=>prod.id=== id)
            //fixme 这里解决一个bug,如果Cart中没有商品，在Admin Products删除会出现const productQty=product.qty报错的问题
            if(!product){
                return
            }
            console.log('product')
            console.log(product)
            const productQty=product.qty
            updatedCart.products=updatedCart.products.filter(prod=>prod.id!==id)
            //更新总价
            updatedCart.totalPrice=updatedCart.totalPrice-productPrice*productQty
            fs.writeFile(p, JSON.stringify(updatedCart),err=>{
                console.log(err)
            })
        })
    }

    //得到购物车的所有商品 使用回调，得到商品后进行一些操作
    static getCart(callback){
        fs.readFile(p, (err, fileContent) => {
            const cart=JSON.parse(fileContent)
            if(err){
                callback(null)
            }else{
                callback(cart)
            }

        })
    }
}
