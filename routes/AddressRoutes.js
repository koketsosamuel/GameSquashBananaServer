const { Router } = require("express")
const verifyAuth = require("../middleware/verifyAuth")
const addressController = require("../controllers/Address")

const router = Router()

router.post("/", verifyAuth, addressController.add)
router.get("/:addressId", verifyAuth, addressController.getOne)
router.get("/", verifyAuth, addressController.getPerUser)

module.exports = router