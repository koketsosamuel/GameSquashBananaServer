const CartItem = require("../../models/CartItem")
const errorMsg = require("../../util/errorMsg")

function getWishList(req, res) {
	//console.log(req.user)
	CartItem.find({ user: req.user._id, wish: true }, (err, items) => {
		if (err)
			return res.json({
				err: errorMsg("Error retrieving Wishlist items"),
			})
		res.json({ results: items })
	})
}

module.exports = getWishList
