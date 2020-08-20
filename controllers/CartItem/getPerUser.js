const CartItem = require("../../models/CartItem")
const errorMsg = require("../../util/errorMsg")
const Product = require("../../models/Product")

async function getPerUser(req, res) {

	let cart = {
		items: [],
		total: 0
	}

	// find cart items in the cart for user
	let cartItemQuery = CartItem.find({ user: req.user._id }) 
	
	if(req.query.wish) cartItemQuery.where("wish").equals(true)
	else cartItemQuery.where("wish").equals(false)

	cartItemQuery.exec(async (err, items) => {
		
		if (err) return res.json({ err: errorMsg("Error retrieving cart items") })
		
		// loop through cart items
		for (let i of items) {

			// find related products
			await Product.findById(i.product, (err, doc) => {
				cart.items.push({...i._doc, product: doc})
				cart.total += (doc.price + doc.taxAmount) * i.quantity
				cart.taxTotal += doc.taxAmount * i.quantity
			})
		}
		

		res.json({results: cart})
	})




}

module.exports = getPerUser
