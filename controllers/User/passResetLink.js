const jwt = require("jsonwebtoken")
const authConf = require("../../config/auth")
const errMsg = require("../../util/errorMsg")
const User = require("../../models/User")

function passResetLink(req, res) {
	let email = req.body.email

	User.findOne({ email: req.body.email }, (err, user) => {
		if (err || !user) return res.json({ err: errMsg("Email not found!") })

		try {
			// sign token
			let token = jwt.sign(user, authConf.jwtKeyPwdResetKey)
			res.json({ token, msg: "Reset link sent to " + email })
		} catch (err) {
			res.json({ err: errMsg("Error with token") })
		}
	})
}

module.exports = passResetLink
