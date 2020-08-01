const { Router } = require("express")
const userOrRandomUser = require("../middleware/userOrRandomUser")
const CartItem = require("../controllers/CartItem/index")
const verifyAuth = require("../middleware/verifyAuth")

const router = Router()

router.get("/", userOrRandomUser, CartItem.getPerUser)
router.post("/", userOrRandomUser, CartItem.add)
router.put("/one/:cartItemId", userOrRandomUser, CartItem.changeQuantity)
router.post("/remove", userOrRandomUser, CartItem.remove)
router.post("/wish", verifyAuth, CartItem.addWishList)
router.put("/wishtocart", verifyAuth, CartItem.wishToCart)
router.get("/wishlist", verifyAuth, CartItem.getWishList)
router.put("/carttowish", verifyAuth, CartItem.cartToWish)

module.exports = router