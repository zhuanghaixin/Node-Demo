/* 1.爬虫：爬取别人网站的数据 */
/* 2.入库：存入自己的数据库 */

/* 2.入库 */
//1.导入数据库
const sequelize = require('./utils/database')


//2.导入Hero Model
const Hero=require('./models/hero')
//2.引入数据库连接池

/* 1.爬虫 */

//1.1 导入模块
const Crawler = require("crawler");

//1.2 创建爬虫对象
const c = new Crawler({
    maxConnections: 10,
    // This will be called for each crawled page
    callback: function (error, res, done) {
        if (error) {
            console.log(error);
        } else {
            const $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server

            let arr = [];
            //显式迭代
            $('.herolist>li').each((index, ele) => {
                //ele:DOM对象
                // console.log( $(ele).html() );
                let name = $(ele).find('img').attr('alt');
                let icon = `https:${$(ele).find('img').attr('src')}`;

                let id = icon.split('/').reverse()[1];
                let skill = `https://game.gtimg.cn/images/yxzj/img201606/heroimg/${id}/${id}00.png`
                console.log(name, icon, skill);

                arr.push({name, icon, skill});

            });

            //开始入库 批量插入
            // 在第二次运行之前，请注释掉以下代码
            // force: true will drop the table if it already exists
            // User.sync({force: true}).then(() => {
            //     // Table created
            //     return User.create({
            //         firstName: 'John',
            //         lastName: 'Hancock'
            //     });
            // });
            sequelize.sync({force: true}).then(() => {
                return Hero.bulkCreate(arr).then(function () { // Notice: There are no arguments here, as of right now you'll have to...
                    return Hero.findAll();
                }).then( () =>{
                    console.log('插入成功') // ... in order to get the array of user objects
                })
            })

        }
        done();
    }
});

//1.3 开始爬虫
// Queue just one URL, with default callback
c.queue('https://pvp.qq.com/web201605/herolist.shtml');
