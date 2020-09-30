//通过Model将数据存储在文件中

const fs = require('fs')
const path = require('path')


const Cart=require('./cart')

const p = path.join(path.dirname(process.mainModule.filename),
    'data',
    'products.json'
)

const getProductsFromFile = (callback) => {

    fs.readFile(p, (err, fileContent) => {
        if (err) {
            callback([])
        } else {
            callback(JSON.parse(fileContent))
        }

    })
}


// const products = [] 这里我们不用数组存储了
module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    //保存数据
    save() {

        getProductsFromFile((products) => {
            if (this.id) {
                const existingProductIndex=products.findIndex(prod=>prod.id===this.id)
                const upadatedProducts=[...products]
                upadatedProducts[existingProductIndex]=this  //Product
                fs.writeFile(p, JSON.stringify(upadatedProducts), (err)=>{
                    console.log('err module/product  module.exports class Producg')
                    console.log(err)
                })
            }else{
                //给每个product添加ID
                this.id = Math.random().toString()
                products.push(this)
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err)
                })
            }

        })

        // // products.push(this)
        // const p=path.join(path.dirname(process.mainModule.filename),
        //     'data',
        //     'products.json'
        // )
        // fs.readFile(p,(err,fileContent)=>{
        //     console.log(err)
        //     console.log(fileContent)
        //     let products=[]
        //     //如果没有有错误，说明有该文件，我们直接将内容解析成JSON格式
        //     if(!err){
        //         products=JSON.parse(fileContent)
        //     }
        //     products.push(this)
        //     fs.writeFile(p,JSON.stringify(products),(err)=>{
        //         console.log(err)
        //     })
        // })

    }



    //删除数据
   static deleteById(id){
       getProductsFromFile(products => {
          // const productIndex=products.findIndex(prod=>prod.id===id)
           const product=products.find(prod=>prod.id===id)
           const updatedProducts=products.filter(prod=>prod.id!==id) //过滤不等于该id的Products
           //再重新写入文件
           fs.writeFile(p, JSON.stringify(updatedProducts),err=>{
               console.log(err)
               Cart.deleteProduct(id,product.price)
           })

       })
    }



    //获取所有数据
    static fetchAll(callback) {
        getProductsFromFile(callback)
        // const p=path.join(path.dirname(process.mainModule.filename),
        //     'data',
        //     'products.json'
        // )
        // //Fixme 注意一下，这里readFile是异步的，所以当我们执行fetchAll()的时候
        // //Fixme readFile里面的函数没有执行完，所以返回undefined
        // //Fixme 在render渲染的时候 shop.ejs   <% if(prods.length>0){ %>就会报错
        // fs.readFile(p,(err,fileContent)=>{
        //     if(err){
        //         // return []
        //         callback([]) //使用回调
        //     }
        //     // return JSON.parse(fileContent)
        //     callback(JSON.parse(fileContent)) //使用回调
        // })
        // // return products
    }

    //获取单个商品的数据
    static findById(id, callback) {
        getProductsFromFile(products => {
            const product = products.find(p => {

                return p.id === id
            })
            callback(product)
        })
    }
}
