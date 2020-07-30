const register = require("./register")
const login = require("./login")
const passResetLink = require("./passResetLink")
const passReset = require("./passReset")
const logout = require("./logout")
const checkAuth = require("./checkAuth")

module.exports = {
	register,
	login,
	passResetLink,
	passReset,
	logout,
	checkAuth
}
