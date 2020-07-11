const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const authConf = require("../../config/auth")
const errMsg = require("../../util/errorMsg")
const User = require("../../models/User")

function passReset(req, res) {
	let token = req.params.token

	// hash password
	bcrypt.hash(req.body.pwd, authConf.saltRounds, async (err, hash) => {
		let user

		if (err) return res.json({ err: errMsg("Unexpected Error!") })

		try {
			// get user data from token
			user = await jwt.verify(token, authConf.jwtKeyPwdResetKey)

			// perform the update
			User.updateOne(
				{
					email: user.email,
				},
				{
					pwd: hash,
					updatedAt: Date.now,
				},
				(err) => {
					if (err)
						return res.json({
							err: errMsg(
								"Error updating password, please retry"
							),
						})
					res.json({ results, msg: "password reset was successful" })
				}
			)
		} catch (err) {
			res.json({ err: errMsg("Link expired, or incorrect link") })
		}
	})
}

module.exports = passReset
