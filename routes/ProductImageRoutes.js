const { Router } = require("express")
const ProductImage = require("../controllers/ProductImage")
const upload = require("../util/upload")

let router = Router()

router.post("/:productId", upload.single("image"), ProductImage.add)
router.get("/:productId", ProductImage.getPerProduct)
router.delete("/:imageId", ProductImage.remove)

module.exports = router
