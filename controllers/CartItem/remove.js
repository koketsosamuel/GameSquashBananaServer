const CartItem = require("../../models/CartItem")
const errorMsg = require("../../util/errorMsg")

async function remove(req, res) {
	
	for(let i = 0; i < req.body.items.length;i++) {
		await CartItem.deleteOne({ _id: req.body.items[i], user: req.user._id }, (err) => {
			if(err) return res.json({err: errorMsg("Couldnt remove some of the items")})
		})
	}

	res.json({msg: "Item(s) removed!"})
}

module.exports = remove
