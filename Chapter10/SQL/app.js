const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

//引入error controller
const errorController = require('./controllers/error')
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

//数据库
const db=require('./util/database')
db.excute('SELECT * FROM products')



const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
