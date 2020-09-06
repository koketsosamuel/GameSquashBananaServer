const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const authConf = require("../../config/auth")
const errMsg = require("../../util/errorMsg")
const User = require("../../models/User")
const mergeCarts = require("../CartItem/helpers/mergeCarts")

function login(req, res) {
	User.findOne({ email: (req.body.email + "").toLowerCase() }, (err, user) => {
		
		if (err || !user) return res.json({ err: errMsg("Account not found!") })

		// check if passwords match
		bcrypt.compare(req.body.pwd, user.pwd, (err, match) => {
			if (err) {
				res.json({ err })
			} else if (match) {
				// create and issue token
				let token = jwt.sign({ ...user._doc }, authConf.jwtKeyAuthKey)
				
				//if(req.body.keepMeLoggedIn) req.sessionOptions.maxAge = null
				req.session.auth = token
				if(!req.body.keepMeLoggedIn) {
					req.sessionOptions.maxAge = null
					req.sessionOptions.expires = null
				}
				
				if(req.session.randomUser) mergeCarts(req.session.randomUser._id, user._id)
				
				res.json({ msg: "Logged In", results: {user, token} })

			} else {
				res.json({ err: errMsg("password incorrect") })
			}
		})
	})
}

module.exports = login
