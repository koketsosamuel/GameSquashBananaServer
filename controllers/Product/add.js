const errorMsg = require("../../util/errorMsg")
const Product = require("../../models/Product")

function add(req, res) {

	let vat = req.body.vat ? 0.15 : 0

	let newProd = new Product({
		
		name: req.body.name,
		description: req.body.description,
		category: req.body.category,
		subCategory: req.body.subCategory,
		tags: req.body.tags,
		
		price: req.body.price,
		
		taxedAmount:  Math.round(Number(req.body.price)),

		quantity: req.body.quantity,
		vat: req.body.vat
	})

	newProd.save((err, results) => {
		if (err) return res.json({ err: errorMsg("Error adding Product") })
		res.json({ msg: "Product created!", results })
	})
}

module.exports = add
