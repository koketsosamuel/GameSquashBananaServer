const register = require("./register")
const login = require("./login")
const passResetLink = require("./passResetLink")
const passReset = require("./passReset")
const logout = require("./logout")
const checkAuth = require("./checkAuth")
const changePhone = require("./changePhone")
const changeEmail = require("./changeEmail")
const changePassword = require("./changePassword")
const banUser = require("./banUser")
const getAll = require("./getAll")
const roleAssignment = require("./roleAssignment")

module.exports = {
	register,
	login,
	passResetLink,
	passReset,
	logout,
	checkAuth,
	changePassword,
	changeEmail,
	changePhone,
	banUser,
	getAll,
	roleAssignment
}
