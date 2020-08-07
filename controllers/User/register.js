const bcrypt = require("bcrypt")
const authConf = require("../../config/auth")
const errMsg = require("../../util/errorMsg")
const User = require("../../models/User")

function register(req, res) {
	
	let user = req.body
	let newUser

	// hash password
	bcrypt.hash(user.pwd, authConf.saltRounds, (err, hash) => {
		
		if (err) return res.json({ err: errMsg("Unexpected Error") })
		user.pwd = hash
		
		newUser = new User({
			name: user.name,
			pwd: user.pwd,
			email: user.email.toLowerCase(),
			phone: user.phone,
		})
		// we save the user and respond to the client
		newUser.save((err) => {
			if (err) return res.json({ err: errMsg("Error registering") })
			res.json({ msg: "You are now registered!" })
		})
	})
}

module.exports = register
