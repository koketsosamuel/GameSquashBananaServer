const errorMsg = require("../../util/errorMsg")
const SubCategory = require("../../models/SubCategory")

function update(req, res) {
	SubCategory.updateOne(
		{
			_id: req.params.id,
		},
		{
			name: req.body.name,
			description: req.body.description,
			updatedAt: Date.now(),
		},
		(err) => {
			if (err)
				return res.json({
					err: errorMsg("Error updating sub-category"),
				})

			res.json({ msg: "sub-category updated!" })
		}
	)
}

module.exports = update
