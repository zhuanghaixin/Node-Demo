//1 引入Hero Model
const Hero = require('../models/hero');
const path= require('path');
//2.导出各种controller下的方法
//3.导入路径
//4.定义基础地址
const BASEURL='http://127.0.0.1:3000'
const  rootDir=require('../utils/path')
console.log(rootDir)
const {Op} = require("sequelize");
exports.getHeroList = (req, res, next) => {
    const url = req.url;
    console.log(url)
    const {search} = req.query;
    console.log(search);
    //如果为空，返回所有，如果不为空，返回英雄
    if (!search) {
        console.log(111)

    } else {
        console.log(222)
        Hero.findAll({
            where: {
                name: {
                    [Op.like]: `%${search}%`
                }
            }
        }).then(heros => {
            console.log(1111)
            res.send({
                code: 200,
                heros: heros
            })
        }).catch(err => {
            res.send({
                code: 500,
                msg: err
            })
        })

    }
}

exports.getHeroInfo = (req, res, next) => {
    //获取heroId
    const heroId=req.params.id
    console.log(heroId)
    Hero.findByPk(heroId)
        .then(hero=>{
            if(!hero){
                res.send({
                   code:404,
                   msg:'没有找到该英雄'
                })
            }else{
                res.send({
                    code:200,
                    data:hero
                })
            }
        }).catch((err)=>{
        console.log(err)
    })
}

exports.updateHero = (req, res, next) => {
    //文本 req.body 走的body-parser
    //文件 req.files 走的express-fileupload
    const {id,name,skill}=req.body
    const {icon}=req.files
    //保存文件
    icon.mv(`${rootDir}/static/imgs/${name}-${id}.png`,err=>{
        if(err){
            res.send({
                code:400,
                msg:'编辑失败'
            });
        }
    })
    //保存文本
    Hero.findByPk(id)
        .then(hero=>{
            if(!hero){
                res.send({
                    code:404,
                    msg:'没有找到该英雄'
                })
            }else{
                hero.name=name
                hero.skill=skill
                hero.icon=`${BASEURL}/imgs/${icon.name}-${id}.png`
                return hero.save()
            }
        }).then(result=>{
        console.log('编辑英雄成功')
        res.send({
            code:200,
            msg:'编辑成功'
        });
    }).
    catch((err)=>{
        console.log(err)
    })
}

exports.deleteHero = (req, res, next) => {
    //获取heroId
    console.log(req.body)
    const {id}=req.body

    Hero.findByPk(id)
        .then(hero=>{
            if(!hero){
                res.send({
                    code:404,
                    msg:'没有找到该英雄,无法删除'
                })
            }else{
                //删除
                return hero.destroy()
            }
        }).then(result=>{
        console.log('删除成功')
        res.send({
            code:200,
            msg:'删除成功'
        })
    }).catch(err=>{
        console.log(err)
    })

}
exports.addHero = (req, res, next) => {
    //文本 req.body 走的body-parser
    //文件 req.files 走的express-fileupload
    const {name,skill}=req.body
    const {icon}=req.files
    //保存文件
    icon.mv(`${rootDir}/static/imgs/${name}.png`,err=>{
        if(err){
            res.send({
                code:400,
                msg:'新增失败'
            });
        }
    })
    //保存文本
    Hero.create({
        name,
        skill,
        icon:`${BASEURL}/imgs/${icon.name}.png`
    }).then(result=>{
        console.log(result)
        console.log('新增成功了')
        res.send({
            code:200,
            msg:'新增成功'
        });
    }).
    catch((err)=>{
        console.log(err)
        res.send({
            code:400,
            msg:'新增失败了'
        });
    })
}
