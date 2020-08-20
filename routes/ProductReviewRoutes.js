const { Router } = require("express")
const productReviewController = require("../controllers/ProductReview")
const verifyAuth = require("../middleware/verifyAuth")

const router = Router()

router.post("/", verifyAuth, productReviewController.add)
router.get("/unapproved", productReviewController.getUnapproved)
router.get("/:productId", productReviewController.getPerProduct)
router.post("/approve", productReviewController.approve)
router.post("/remove", productReviewController.remove)

module.exports = router