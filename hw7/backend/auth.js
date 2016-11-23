const User = require('./model.js').User
const Profile = require('./model.js').Profile
const redis = require('redis').createClient('redis://h:p41jqc21ivb76rddrtl5kda0e4k@ec2-54-221-238-190.compute-1.amazonaws.com:10989')

const cookieKey = 'sid'
const md5 = require('md5')
const sessionUser = {}
const pepper = md5("This is my secret peeper!")

const register = (req, res) => {
    console.log('call register()', req.body)
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    const zipcode = req.body.zipcode
    findByUser(username, function(items){
    	if(items.length !== 0) {
    		res.status(401).send("User already existed")
    		return
    	}
    	else {
    		const salt = md5(Math.random() + username + new Date().getTime())
    		const hash = md5(password + salt + pepper)
    		const newUser = {username: username, salt: salt, hash: hash}
    		new User(newUser).save()
    		const newProfile = {
    			username: username,
    			headline: "Think different",
    			following: [],
    			email: email,
    			zipcode: zipcode,
    			avatar: "https://s-media-cache-ak0.pinimg.com/originals/da/82/2f/da822f1c8db6fb56243e5e9d87b623bf.jpg"
    		}
    		new Profile(newProfile).save()
    		res.status(200).send({ result: 'success', username: username})
    	}
    })
}

function findByUser(username, callback) {
	User.find({ username: username }).exec(function(err, items) {
		console.log('There are ' + items.length + ' entries for ' + User)
		callback(items)
	})
}

// log in to server, set session id and hash cookies
const login = (req, res) => {
	console.log('call login()', req.body)
	const username = req.body.username
	const password = req.body.password
	if (!username || !password) {
		res.status(400).send("Invalid input")
		return
	}
	//const userObj = getUser(username)
	findByUser(username, function(items) {
		if(items.length === 0) {
			res.status(401).send("User not exist")
			return
		}
		else{
			const userObj = items[0]
			const salt = userObj.salt
			const hash = userObj.hash
			if(hash != md5(password + salt + pepper)){
				console.log('hash = '+ hash + ' salt = ' + salt)
				res.status(401).send("Wrong password")
				return
			}
			console.log('username = ', userObj.username, 'hash = ', hash)
			const sessionKey = md5(pepper + new Date().getTime() + username)
			sessionUser[sessionKey] = userObj
			redis.hmset(sessionKey, {username})
			res.cookie(cookieKey, sessionKey, {maxAge:3600*1000, httpOnly:true})
			console.log('set cookies : ', req.cookies)
			const msg = {username: username, result: 'success'}
			res.status(200).send(msg)
		}
	})
}

const isLoggedIn = (req, res, next) => {
  console.log('isLoggedIn, cookies = ', req.cookies)
  const sid = req.cookies[cookieKey]

  if(!sid) {
    return res.status(401).send("no sid! so unauthorized") //Unauthorized
  }
  redis.hgetall(sid, function(err, userObj) {
	if(userObj.username) {
      console.log(sid + ' mapped to ' + userObj.username)
	  req.username = userObj.username
	  next()
	}
	else {
	  res.status(401).send("unauthorized")
	}
  })
}

const logout = (req, res) => {
	console.log('call logout()', req.cookies)
	const sid = req.cookies[cookieKey]
	if(sid) {
		redis.del(sid)
	}
	res.clearCookie(cookieKey)
	res.status(200).send("OK")
}

function setup(app) {
     app.post('/register', register)
     app.post('/login', login)
     app.put('/logout', isLoggedIn, logout)
}

module.exports = { setup, isLoggedIn }
