const register = require("./register")
const login = require("./login")
const passResetLink = require("./passResetLink")
const passReset = require("./passReset")
const logout = require("./logout")
const checkAuth = require("./checkAuth")
const changePhone = require("./changePhone")
const changeEmail = require("./changeEmail")
const changePassword = require("./changePassword")

module.exports = {
	register,
	login,
	passResetLink,
	passReset,
	logout,
	checkAuth,
	changePassword,
	changeEmail,
	changePhone
}
