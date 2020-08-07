const express = require("express")
const Product = require("../controllers/Product")
const router = express.Router()
const upload = require("../util/upload")

router.get("/", Product.getAll)
router.get("/:productId", Product.getOne)
router.post("/", Product.add)
router.put("/:productId", Product.update)
router.put("/thumb/:productId", upload.single("thumb"), Product.addThumb)
router.put("/quantity/:productId", Product.changeQuantity)
router.put("/discontinue/:productId", Product.discontinue)
router.put("/continue/:productId", Product.continue)
router.get("/search", Product.search)

// router.delete("/:productId", Products.remove)

module.exports = router
