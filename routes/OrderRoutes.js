const { Router } = require("express")
const orderController = require("../controllers/Order")
const verifyAuth = require("../middleware/verifyAuth")

let router = Router()

router.get("/", verifyAuth,orderController.getAll)
router.get("/one/:orderId", verifyAuth,orderController.getOne)
router.post("/", verifyAuth,orderController.add)
router.post("/", orderController.receive)
router.get("/myorders", verifyAuth, orderController.getPerUser)
router.put("/:orderId", verifyAuth, orderController.changeStatus)

module.exports = router