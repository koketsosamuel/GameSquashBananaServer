const errorMsg = require("../../util/errorMsg")
const Product = require("../../models/Product")
const getSettings = require("../../util/getSettings")

function add(req, res) {
	let newProd = new Product({
		name: req.body.name,
		description: req.body.description,
		category: req.body.category,
		subCategory: req.body.subCategory,
		tags: req.body.tags,
		
		price: req.body.price,
		
		taxAmount:  
			Number(
				req.body.price * (req.body.vat ? getSettings("../../settings.json").vat : 0)
			),

		quantity: req.body.quantity,
		vat: req.body.vat
	})

	newProd.save((err, results) => {
		if (err) return res.json({ err: errorMsg("Error adding Product") })
		res.json({ msg: "Product created!", results })
	})
}

module.exports = add
