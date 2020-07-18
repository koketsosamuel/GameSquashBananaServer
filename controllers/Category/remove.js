const Category = require("../../models/Category")
const errorMsg = require("../../util/errorMsg")
const SubCategory = require("../../models/SubCategory")

function remove(req, res) {
	SubCategory.deleteMany({ category: req.params.categoryId }, (err) => {
		if (err)
			return res.json({
				err: errorMsg("Error removing category! Try again!"),
			})
		Category.deleteOne(
			{
				_id: req.params.categoryId,
			},
			async (err) => {
				if (err)
					return res.json({
						err: errorMsg("Error removing category! Try again!"),
					})

				res.json({ msg: "Category removed!" })
			}
		)
	})
}

module.exports = remove
