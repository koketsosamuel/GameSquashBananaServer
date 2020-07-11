const Category = require("../../models/Category")
const errorMsg = require("../../util/errorMsg")

function add(req, res) {
	let newCat = new Category({
		name: req.body.name,
		description: req.body.description,
		manager: req.body.manager || null,
	})

	newCat.save((err) => {
		if (err) return res.json({ err: errorMsg("Error adding category") })

		res.json({ msg: "Category created!" })
	})
}

module.exports = add
