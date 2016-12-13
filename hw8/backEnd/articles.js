const Article = require('./model.js').Article
const isLoggedIn = require('./auth.js').isLoggedIn
const multer = require('multer')
const doUpload = require('./uploadCloudinary').doUpload
const md5 = require('md5')

const getArticles = (req, res) => {
	console.log('call getArticles', req.body)
	const id = req.params.id
	if(!id) {
		Article.find().sort({date:-1}).exec(function(err, items){
			res.send({articles: items})
		})
	}
	else {
		Article.findOne({_id: id}).exec(function(err, items){
			if(!items) {
				res.status(404).send("No articles found!")
				return
			}
			res.send({articles: [items]})
		})
	}
}

const putArticle = (req, res) => {
	console.log('call putArticle', req.body)
	const id = req.params.id
	const commentId = req.body.commentId
	//Just update the article
	if(!commentId) {
		console.log('update the article ', id)
		Article.findOneAndUpdate({_id: id, author: req.username}, {text: req.body.text}, {new:true})
		.exec(function(err, newArticle){
			if(!newArticle){
				res.status(401).send("Forbbien to edit article")
				return
			}
			res.send({articles: [newArticle]})
			return
		})
	}
	else {
		if (commentId == -1) {//New comment
			Article.findOne({_id: id}, function(err, article) {
				const commentId = article.comments.length + 1
				const newComment = {commentId: commentId, author: req.username, text: req.body.text, date: new Date()}
				Article.findOneAndUpdate({_id: id}, {$push: {comments: newComment}}, {new:true})
				.exec(function(err, newArticle){
					console.log('update the newArticle = ', newArticle)
					res.send({articles: [newArticle]})
					return
				})
			})
		}
		else {//update a comment
			Article.findOneAndUpdate({_id: id, "comments.commentId": commentId, "comments.author": req.username},
			{$set: {"comments.$.text": req.body.text}}, {new:true})
			.exec(function(err, newArticle){
				if(!newArticle){
					res.status(401).send("Forbbien to edit comment")
					return
				}
				res.send({articles: [newArticle]})
				return
			})
		}
	}
}

const uploadArticle = (req, res, next) => {
	console.log('call uploadArticle', req.file)
    if (req.file) {
    	const publicName = md5(Math.random() + new Date().getTime())
    	doUpload(publicName, req, res, next)
    }
    else {
    	next()
    }
}

const postArticle = (req, res) => {
    console.log('call postArticle image', req.fileurl)
    console.log('call postArticle text', req.body.text)
    //const articleId = Article.dataSize()
    Article.count({}, function(err, count){
    	const articleId = count + 1
    	const newArticle = {_id: articleId, author: req.username, text: req.body.text, date: new Date(), img: req.fileurl ? req.fileurl : "", comments: []}
    	//new Article(newArticle).save() 
    	Article.create(newArticle, function(err, items){
			res.send({articles: [items]})
   		}) 
	})
}

module.exports = (app) => {
	 app.use(isLoggedIn)
     app.get('/articles/:id*?', getArticles)
     app.put('/articles/:id', putArticle)
     app.post('/article', multer().single('image'), uploadArticle, postArticle)
}