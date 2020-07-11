const errorMsg = require("../util/errorMsg")
const SubCategory = require("../models/SubCategory")

function add(req, res) {
	let newCat = new SubCategory({
		name: req.body.name,
		description: req.body.description,
		category: req.body.category,
	})

	newCat.save((err) => {
		console.log(err)
		if (err) return res.json({ err: errorMsg("Error adding sub-category") })

		res.json({ msg: "sub-category created!" })
	})
}

module.exports = add
