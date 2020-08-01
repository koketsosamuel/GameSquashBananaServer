const errorMsg = require("../../util/errorMsg")
const Category = require("../../models/Category")
const SubCategory = require("../../models/SubCategory")

function getOne(req, res) {

	// get the category
	Category.findOne(
		{
			_id: req.params.categoryId,
		},
		(err, results) => {
			if (err)
				return res.json({ err: errorMsg("Error fetching category") })
			if (!results)
				return res.json({ err: errorMsg("Category not found") })

			// get related sub categories
			SubCategory.find(
				{ category: results._id },
				null,
				{ sort: { name: 1 } },
				(err, subs) => {
					if (err)
						return res.json({
							err: errorMsg("Error fetching category"),
						})

					res.json({ results: { ...results._doc, subs } })
				}
			)
		}
	)
}

module.exports = getOne
