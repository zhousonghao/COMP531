// this is model.js 
var mongoose = require('mongoose')
require('./db.js')

var commentSchema = new mongoose.Schema({
	commentId: Number, author: String, text: String, date: Date, _id: false
})
var articleSchema = new mongoose.Schema({
	_id: Number, author: String, text: String, date: Date, img: String,
	comments: [ commentSchema ]
})
var userSchema = new mongoose.Schema({
	username: String, salt: String, hash: String,
})
var profileSchema = new mongoose.Schema({
    username: String, headline: String, following: [ String ], email: String,
    zipcode: String, avatar: String    
})

exports.Article = mongoose.model('articles', articleSchema)
exports.User = mongoose.model('users', userSchema)
exports.Profile = mongoose.model('profiles', profileSchema)