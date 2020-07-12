const CartItem = require("../../models/CartItem")
const errorMsg = require("../../util/errorMsg")

function add(req, res) {
	let newCI = new CartItem({
		user: req.user._id,
		product: req.body.productId,
	})

	newCI.save((err) => {
		if (err)
			return res.json({ err: errorMsg("Error adding product to cart") })
		res.json({ msg: "Added to cart!" })
	})
}

module.exports = add
