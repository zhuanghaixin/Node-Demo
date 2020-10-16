const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
    MongoClient.connect('mongodb+srv://zhuanghaixin:zhx199710085470@cluster0.wwisb.mongodb.net/shop?retryWrites=true&w=majority')
        .then(client => {
            console.log('Connected!');
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;


// const mongodb = require('mongodb')
// const MongoClient=mongodb.MongoClient
//
// const mongoConnect=(callback) =>{
//     MongoClient.connect('mongodb+srv://zhuanghaixin:zhx199710085470@cluster0.wwisb.mongodb.net/<dbname>?retryWrites=true&w=majority')
//         .then(result => {
//             console.log('Connected!!')
//             callback
//         })
//         .catch(err=>{
//             console.log(err)
//         })
//
// }

