const errorMsg = require("../../util/errorMsg")
const Product = require("../../models/Product")

function add(req, res) {
	let newCat = new Product({
		name: req.body.name,
		description: req.body.description,
		category: req.body.category,
		subCategory: req.body.subCategory,
		tags: req.body.tags,
		price: req.body.price,
		quantity: req.body.quantity,
	})

	newCat.save((err, results) => {
		if (err) return res.json({ err: errorMsg("Error adding Product") })
		res.json({ msg: "Product created!", results })
	})
}

module.exports = add
