const Profile = require('./model.js').Profile
const isLoggedIn = require('./auth.js').isLoggedIn

const getFollowing = (req, res) => {
	console.log('call getFollowing', req.username)
	const user = req.params.user ? re.params.user: req.username
    Profile.findOne({username: user}).exec(function(err, profile){
        res.send({username: user, following: profile.following})
    }) 
}

const putFollowing = (req, res) => {
	console.log('call putFollowing', req.username)
	const user = req.params.user
    Profile.findOne({username: user}).exec(function(err, follower){
		if (!follower || user == req.username) { //if the follower is not find or the follwer is user self
            Profile.findOne({username: req.username}).exec(function(err, profile){
            	res.send({username: req.username, following: profile.following})
            })
        }
        else {//find the new follower
	        Profile.findOneAndUpdate({username: req.username}, 
	        {$addToSet: {following: follower.username}}, 
	        {new:true}).exec(function(err, profile){
	        	res.send({username: req.username, following: profile.following})
	        })        	
        }
    })
}

const deleteFollowing = (req, res) => {
	console.log('call deleteFollowing', req.username)
	const user = req.params.user
	Profile.findOneAndUpdate({username: req.username}, 
	{$pull: {following: user}}, 
	{new:true}).exec(function(err, profile){
		res.send({username: req.username, following: profile.following})
	})
}

module.exports = (app) => {
	app.use(isLoggedIn)
	app.get('/following/:user?', getFollowing)
	app.put('/following/:user', putFollowing)
	app.delete('/following/:user', deleteFollowing)
}