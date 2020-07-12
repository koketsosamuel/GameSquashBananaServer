const CartItem = require("../../models/CartItem")
const errorMsg = require("../../util/errorMsg")

function addWishList(req, res) {
	let newWI = new CartItem({
		wish: true,
		user: req.user._id,
		product: req.body.productId,
	})

	newWI.save((err) => {
		if (err) return res.json({ err: errorMsg("Error adding to wishlist") })
		res.json({ msg: "Added to wishlist" })
	})
}

module.exports = addWishList
