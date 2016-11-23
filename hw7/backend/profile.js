const Profile = require('./model.js').Profile
const isLoggedIn = require('./auth.js').isLoggedIn
const uploadImage = require('./uploadCloudinary').uploadImage

const getUserHeadline = (req, res) => {
    console.log('call getUserHeadline', req.username)
    if (!req.user) req.user = req.username
    const users = req.params.users ? req.params.users.split(',') : [req.user]

    Profile.find({username: {$in: users}}).exec(function(err, profiles){
        if (!profiles) {
            res.status(404).send("Profile not find")
            return
        }
        const headlines = []
        profiles.forEach(function(profile){
          headlines.push({username: profile.username, headline: profile.headline})
        })
        res.send({ headlines: headlines})
    })
}

const putHeadline = (req, res) => {
     console.log('call putHeadline', req.body)
     const headline = req.body.headline
     if(!headline) {
          res.status(400).send("No headline! Invalid input")
          return
     }
     Profile.findOneAndUpdate({username: req.username}, {headline: headline}).exec(function(err, profile){
        res.send({
          username: req.username,
          headline: headline
        })
     })
}
// req.params.users
const getUserEmail = (req, res) => {
     console.log('call getUserEmail', req.username)
     const user = req.params.user ? req.params.user : req.username
     Profile.findOne({username: user}).exec(function(err, profile){
        res.send({username: user, email: profile.email})
     }) 
}

const putEmail = (req, res) => {
     console.log('call putEmail', req.body)
     const email = req.body.email 
     if(!email) {
          res.status(400).send("No email! Invalid input")
          return
     }
     Profile.findOneAndUpdate({username: req.username}, {email: email}).exec(function(err, profile){
        res.send({
          username: req.username,
          email: email
        })
     })
}

//stub for now
const getDob = (req, res) => {
     console.log('call getDob', req.username)
     res.send({
          username: req.username,
          dob: '1992/10/21'
     })
}

const getUserZip = (req, res) => {
     console.log('call getUserZip', req.username)
     const user = req.params.user ? req.params.user : req.username
     Profile.findOne({username: user}).exec(function(err, profile){
        res.send({username: user, zipcode: profile.zipcode})
     }) 
}

const putZip = (req, res) => {
     console.log('call putZip', req.body)
     const zipcode = req.body.zipcode 
     if(!zipcode) {
          res.status(400).send("No zipcode! Invalid input")
          return
     }
     Profile.findOneAndUpdate({username: req.username}, {zipcode: zipcode}).exec(function(err, profile){
        res.send({
          username: req.username,
          zipcode: zipcode
        })
     })
}

const getUserAvatar = (req, res) => {
    console.log('call getUserAvatar', req.username)
    if (!req.user) req.user = req.username
    const users = req.params.users ? req.params.users.split(',') : [req.user]

    Profile.find({username: {$in: users}}).exec(function(err, profiles){
        if (!profiles) {
          res.status(404).send("Profile not find")
          return
        }
        const avatars = []
        profiles.forEach(function(profile){
          avatars.push({username: profile.username, avatar: profile.avatar})
        })
        res.send({ avatars: avatars})
    })
}

const putAvatar = (req, res) => {
  console.log('call putAvatar', req.fileurl)
     const avatar = req.fileurl
     if(!avatar) {
          res.status(400).send("No avatar! Invalid input")
          return
     }
     Profile.findOneAndUpdate({username: req.username}, {avatar: avatar}).exec(function(err, profile){
        res.send({
          username: req.username,
          avatar: avatar
        })
     })   
}

module.exports = (app) => {
     app.use(isLoggedIn)
     app.get('/headlines/:users?', getUserHeadline)
     app.put('/headline', putHeadline)
     app.get('/email/:user?', getUserEmail)
     app.put('/email', putEmail)
     app.get('/dob', getDob)
     app.get('/zipcode/:user?', getUserZip)
     app.put('/zipcode', putZip)
     app.get('/avatars/:users?', getUserAvatar)
     app.put('/avatar', uploadImage('avatar'), putAvatar)
}