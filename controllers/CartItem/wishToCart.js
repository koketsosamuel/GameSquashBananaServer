const errorMsg = require("../../util/errorMsg")
const CartItem = require("../../models/CartItem")

function wishToCart(req, res) {
	CartItem.updateOne(
		{ _id: req.params.cartItemId },
		{
			wish: false,
		},
		(err) => {
			if (err)
				return res.json({
					err: errorMsg("Error adding to cart"),
				})
			res.json({ msg: "Added to cart!" })
		}
	)
}

module.exports = wishToCart
