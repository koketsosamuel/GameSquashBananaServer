const CartItem = require("../../models/CartItem")
const errorMsg = require("../../util/errorMsg")
const Product = require("../../models/Product")

async function getPerUser(req, res) {

	let cart = {
		items: [],
		total: 0,
		taxTotal: 0
	}

	// find cart items in the cart for user
	let cartItemQuery = CartItem.find({ user: req.user._id , wish: req.query.wish ? true : false}) 
	
	cartItemQuery.exec(async (err, items) => {
		
		if (err) return res.json({ err: errorMsg("Error retrieving cart items") })

		// loop through cart items
		for (let i of items) {

			// find related products
			await Product.findById(i.product, (err, doc) => {
				cart.items.push({...i._doc, product: doc})
				if(doc && doc.vat) {
					cart.total += doc.taxedAmount * i.quantity
					cart.taxTotal += doc.taxedAmount * i.quantity * 0.15
				} else cart.total += doc.price * i.quantity
			})
		}

		cart.total = Math.round(cart.total)
		cart.taxTotal = Math.round(cart.taxTotal)
		
		res.json({results: cart})

	})


}

module.exports = getPerUser
