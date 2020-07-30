const CartItem = require("../../models/CartItem")
const errorMsg = require("../../util/errorMsg")
const checkExistence = require("./helpers/checkExistence")

async function addWishList(req, res) {

	let exists = await checkExistence(req.user._id, req.body.product, true)
	if(exists) return res.json({info: "Already exists in your wishlist!"})	

	let newWI = new CartItem({
		wish: true,
		user: req.user._id,
		product: req.body.product,
	})

	newWI.save((err) => {
		if (err) return res.json({ err: errorMsg("Error adding to wishlist") })
		res.json({ msg: "Added to wishlist" })
	})
}

module.exports = addWishList
