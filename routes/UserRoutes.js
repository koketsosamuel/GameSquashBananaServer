const express = require("express")
const router = express.Router()
const userController = require("../controllers/User")
const verifyAth = require("../middleware/verifyAuth")

router.post("/register", userController.register)
router.post("/login", userController.login)
router.post("/pwdresetlink", userController.passResetLink)
router.post("/pwdreset/:token", userController.passReset)
router.post("/logout", userController.logout)
router.post("/checkauth", userController.checkAuth)
router.put("/email", verifyAth, userController.changeEmail)
router.put("/password", verifyAth, userController.changePassword)
router.put("/phone", verifyAth, userController.changePhone)
router.put("/ban/:userId", userController.banUser)
router.put("/roles/:userId", userController.roleAssignment)
router.get("/", userController.getAll)

// router.post("/emailverifylink", userController.emailVerifyLink)
// router.post("/emailverify/:token", userController.emailVerify)

module.exports = router
