const express = require("express")
const router = express.Router()
const userController = require("../controllers/User")

router.post("/register", userController.register)
router.post("/login", userController.login)
router.post("/pwdresetlink", userController.passResetLink)
router.post("/pwdreset/:token", userController.passReset)
// router.post("/emailverifylink", userController.emailVerifyLink)
// router.post("/emailverify/:token", userController.emailVerify)

module.exports = router
