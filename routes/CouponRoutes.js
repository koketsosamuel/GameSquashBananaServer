const { Router } = require("express")
const couponCotroller = require("../controllers/Coupon")

let router = Router()

router.post("/", couponCotroller.add)
router.get("/", couponCotroller.get)
router.get("/:couponCode", couponCotroller.getOne)
router.put("/:couponId", couponCotroller.update)
router.put("/discontinue/:couponId", couponCotroller.update)
router.delete("/:couponId", couponCotroller.remove)

module.exports = router