const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const authConf = require("../../config/auth")
const errMsg = require("../../util/errorMsg")
const User = require("../../models/User")

function login(req, res) {
	User.findOne({ email: req.body.email }, (err, user) => {
		if (err || !user) return res.json({ err: errMsg("Account not found!") })

		// check if passwords match
		bcrypt.compare(req.body.pwd, user.pwd, (err, match) => {
			if (err) {
				res.json({ err })
			} else if (match) {
				// create and issue token
				let token = jwt.sign({ ...user }, authConf.jwtKeyAuthKey, {
					expiresIn: "1h",
				})
				res.cookie("auth", token, {
					signed: true,
					httpOnly: true,
				})
				res.json({ msg: "Logged In" })
			} else {
				res.json({ err: errMsg("password incorrect") })
			}
		})
	})
}

module.exports = login
