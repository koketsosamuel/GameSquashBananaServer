const CartItem = require("../../models/CartItem")
const errorMsg = require("../../util/errorMsg")
const Product = require("../../models/Product")

async function getPerUser(req, res) {

	let cart = {
		items: [],
		total: 0
	}

	let ci = CartItem.find({ user: req.user._id, wish: false }) 
	
	if(req.query.wish) ci.where("wish").equals(true)

	ci.exec(async (err, items) => {
		
		if (err) return res.json({ err: errorMsg("Error retrieving cart items") })
		
		for (let i of items) {
			await Product.findById(i.product, (err, doc) => {
				cart.items.push({...i._doc, product: doc})
				cart.total += doc.price * i.quantity
			})
		}
		

		res.json({results: cart})
	})




}

module.exports = getPerUser
