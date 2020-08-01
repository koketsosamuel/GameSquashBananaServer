const errorMsg = require("../../util/errorMsg")
const SubCategory = require("../../models/SubCategory")

function getOne(req, res) {
	SubCategory.findOne(
		{
			_id: req.params.subCategoryId,
		},
		(err, results) => {
			if (err)
				return res.json({
					err: errorMsg("Error fetching sub-category"),
				})

			res.json({ results })
		}
	)
}

module.exports = getOne
