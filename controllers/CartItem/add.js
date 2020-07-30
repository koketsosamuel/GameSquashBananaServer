const CartItem = require("../../models/CartItem")
const errorMsg = require("../../util/errorMsg")
const checkExistence = require("./helpers/checkExistence")

async function add(req, res) {

	let exists = await checkExistence(req.user._id, req.body.product)

	if(!exists) {
		let newCI = new CartItem({
			user: req.user._id,
			product: req.body.product,
		})
	
		newCI.save((err) => {
			if (err)
				return res.json({ err: errorMsg("Error adding product to cart") })
			res.json({ msg: "Added to cart!" })
		})
	} else {
		CartItem.findOne({user: req.user._id, product: req.body.product}, (err, ci) => {
			ci.quantity += 1
			ci.save(err => {
				if(err) return res.json({err: errorMsg("Error adding to cart! Try again")})
				res.json({msg: "quantity updated!"})
			})
		})
	}
}

module.exports = add
