/*
* @Author: Tian
* @Date:   2017-12-08 13:52:51
* @Last Modified by:   Tian
* @Last Modified time: 2017-12-14 16:37:26
*/
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var con = mysql.createConnection({
	host:'localhost',
	port:8889,
	user:'root',
	password:'root',
	database:'bdnews'
});
con.connect();
/* GET admin listing. */
router.get('/', function(req, res, next) {
    res.render('admin')
});

router.post('/addNews',function(req,res,next){
	var title = req.body.title;
	var category = req.body.category;
	var img = req.body.img;
	var source = req.body.source;
	var time = req.body.time;
	var sign = req.body.sign;
	// var sql = "INSERT INTO news_db( title, category, img, source,time,sign) VALUES (?,?,?,?,?,?)";
	var sql = `INSERT INTO news_db (title, category, img, source,time,sign) VALUES ('${title}','${category}','${img}','${source}','${time}','${sign}')`;
	// console.log(sql)
	con.query(sql,function(err, results,f) {
		res.json(results)
		// console.log(results)
	});
})

router.get('/newslist',function(req,res,next){
	res.render('newslist')
})

//获取所有新闻
router.get('/getAllNews',function(req,res,next){
	var sql = 'select * from news_db';
	con.query(sql,function(err,results,f){
		if(err){
			console.log(err);
		}else{
			res.json(results);
			 // console.log(results)
		}
	})

})
//删除新闻
router.post('/deleteNews',function(req,res,next){
	var id = req.body.id;
	var sql = `DELETE FROM news_db WHERE id=${id}`;
	con.query(sql,function(err,results,f){
		if(err){
			console.log(err)
		}else{
			res.json({state:"ok",message:"删除成功"})
		}
	})
})

//编辑新闻

router.get('/editNews',function(req,res,next){
	res.render('editNews')
})

router.get('/edit',function(req,res,next){
	var id = req.query.id;
	var sql = `select * from news_db where id=${id}`;
	con.query(sql,function(err,results,f){
		res.json(results)
		console.log(results)
	})
	
})

router.post('/update',function(req,res,next){
	var id = req.body.id;
	var title = req.body.title;
	var category = req.body.category;
	var img = req.body.img;
	var source = req.body.source;
	var time = req.body.time;
	var sign = req.body.sign;
	var sql = `UPDATE news_db SET title='${title}',category='${category}',img='${img}',source='${source}',time='${time}',sign='${sign}' where id=${id}` ;
	console.log(sql)
	con.query(sql,function(err, results,f) {

		 // res.json(results)
		 // res.send('修改成功')
		 res.redirect('/admin/newslist')
		
	});
})

router.post('/selectNews',function(req,res,next){
	console.log(req.body)
	var category = req.body.category;
	var sql = `select * from news_db where category='${category}'`;
	con.query(sql,function(err,results,f){
		res.json(results)
		
	})
	
})

module.exports = router;
