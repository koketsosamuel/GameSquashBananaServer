const errorMsg = require("../../util/errorMsg")
const CartItem = require("../../models/CartItem")

function changeQuantity(req, res) {
	CartItem.updateOne(
		{ _id: req.params.cartItemId },
		{
			quantity: req.body.quantity,
		},
		(err) => {
			if (err)
				return res.json({
					err: errorMsg("Error updating your cart item quantity"),
				})
			res.json({ msg: "Quantity updated" })
		}
	)
}

module.exports = changeQuantity
