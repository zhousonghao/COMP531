const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const app = express()
app.use(logger('default'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(enableCORS)

function enableCORS(req, res, next) {
	res.header("Access-Control-Allow-Origin", req.header('Origin'))
	res.header('Access-Control-Allow-Credentials', 'true')
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
	res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type, X-Requested-With, X-Session-Id')
	res.header('Access-Control-Expose-Headers', 'Location, X-Session-Id')
	if(req.method == 'OPTIONS') {
		res.status(200).send("OK")
	}
	else {
		next()
	}
}

require('./auth.js').setup(app)
require('./articles.js')(app)
require('./profile.js')(app)
require('./following.js')(app)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
