var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var con = mysql.createConnection({
	host:'localhost',
	port:8889,
	user:'root',
	password:'root',
	database:'bdnews',
});
con.connect();
router.get('/', function(req, res, next) {
	console.log(req.cookies)
	var json = null;
	if(req.cookies.user !== null){
	 	json = {
	 		user:req.cookies.user
	 	}
	}
	res.render('index',json);
	// res.render('index')
})

/* GET home page. */
// router.get('/topNav', function(req, res, next) {
// 	var sql = 'SELECT DISTINCT category FROM news_db';
// 	con.query(sql,function(err,results,f){
// 		// console.log(results)
// 		if(err){
// 			console.log(err);
// 		}else{
// 			// res.render('index', {navObj:results});
// 			// res.render('index');
// 			res.json(results)
			
// 		}
// 	})

// });

router.post('/getNews', function(req, res, next){
	var category = req.body.category;
	console.log(category)
	var sql = `select * from news_db where category='${category}'`;
	con.query(sql,function(err,results,f){
		if(err){
			console.log(err)
		}else{

			res.json(results)
			console.log(results)
		}
	})
})

router.post('/getSwiper', function(req, res, next){
	var category = req.body.category;
	var sql = `select * from news_db where category='${category}' && sign=2`;
	con.query(sql,function(err,results,f){
		if(err){
			console.log(err)
		}else{

			res.json(results)
			// console.log(results)
		}
	})
})



router.get('/getNewsD', function(req, res, next) {
	var sql = "SELECT * FROM news_db where category='推荐'";
	con.query(sql,function(err,results,f){
		// console.log(results)
		if(err){
			console.log(err);
		}else{
			// res.render('index', {navObj:results});
			// res.render('index');
			res.json(results)
			console.log(results)
			
		}
	})

});

router.get('/getSwiperD', function(req, res, next){
	var sql = `select * from news_db where category='推荐' && sign=2`;
	con.query(sql,function(err,results,f){
		if(err){
			console.log(err)
		}else{
			res.json(results)
			
		}
	})
})

router.get('/login',function(req,res,next){
	// console.log(req.cookie)
	res.render('login');
})
router.get('/register',function(req,res,next){
	res.render('register');
})

router.post('/register',function(req,res,next){
	var username = req.body.username;
	var psw = req.body.password;
	var sql1 = `INSERT INTO user (username, password) VALUES ('${username}','${psw}')`;
	var sql2=`select * from user where username = '${username}'`;
	con.query(sql2,function(err,results,f){
		if(err){
			console.log(err)
		}else{
			console.log(results)
			if(results.length===1){
			 	res.send({state:'noOk',message:'用户已存在'})
			}else{
				con.query(sql1,function(err,results,f){
					if(err){
						res.send({state:'noOk',message:'注册失败'})
					}else{
						if(results.affectedRows===1){
							res.send({state:'Ok',message:'注册成功'})
						}
					}
				})
			}
			
		}

	})
	

	

})

router.post('/login',function(req,res,next){
	var username = req.body.username;
	var psw = req.body.psw;
	// var user = {
	// 	username:'admin',
	// 	password:123456
	// }
	console.log(req.body)
	var sql = `select * from user where username = '${username}' and password = '${psw}'`;
	con.query(sql,function(err,results,f){
		if(err){
			console.log(err);
			res.send({state:'noOk',message:'输入信息有误'})
		}else{
			
			console.log(results)
			if(results.length===1){
				res.cookie('user', {'username':username},{maxAge:60000,httpOnly:false});
			 	res.send({state:'ok',message:'登录成功'})
			}else{
				res.send({state:'noOk',message:'用户名或密码错误'})

			}

		}
	})
	// if(user.username == username && user.password == psw){
	// 	res.cookie('user',  {'username':username},{maxAge:60000,httpOnly:false});
	// 	res.send({state:'ok',message:'登录成功'})
	// }else{
	// 	res.send({state:'noOk',message:'用户名错误'})
	// }


})


router.get('/signOut',function(req,res,next){
	// 清除cookie
	res.clearCookie('user');
	res.redirect('/');

})


module.exports = router;
