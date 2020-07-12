const CartItem = require("../../models/CartItem")
const errorMsg = require("../../util/errorMsg")

function getPerUser(req, res) {
	CartItem.find({ user: req.user._id, wish: false }, (err, items) => {
		if (err)
			return res.json({ err: errorMsg("Error retrieving cart items") })
		res.json({ results: items })
	})
}

module.exports = getPerUser
