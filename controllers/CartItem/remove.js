const CartItem = require("../../models/CartItem")
const errorMsg = require("../../util/errorMsg")

function remove(req, res) {
	CartItem.findOne({ _id: req.params.cartItemId }, (err, item) => {
		if (err) return res.json({ err: errorMsg("Error removing cart item") })
		if (item.user != req.user._id)
			return res.json({ err: errorMsg("Not Authorized") })
		item.remove((err) => {
			if (err)
				return res.json({ err: errorMsg("Error removing cart item") })
			res.json({ msg: "Cart item removed" })
		})
	})
}

module.exports = remove
