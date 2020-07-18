const Category = require("../../models/Category")
const errorMsg = require("../../util/errorMsg")

function update(req, res) {
	Category.updateOne(
		{
			_id: req.params.categoryId,
		},
		{
			name: req.body.name,
			description: req.body.description,
			manager: req.body.manager || null,
			updatedAt: Date.now(),
		},
		(err) => {
			if (err)
				return res.json({ err: errorMsg("Error updating category") })

			res.json({ msg: "Category updated!" })
		}
	)
}

module.exports = update
