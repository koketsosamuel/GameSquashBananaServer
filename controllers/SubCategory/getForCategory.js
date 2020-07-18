const errorMsg = require("../../util/errorMsg")
const SubCategory = require("../../models/SubCategory")

function getForCategory(req, res) {
	SubCategory.find({ category: req.params.id }, (err, results) => {
		if (err)
			return res.json({ err: errorMsg("Error fetching sub-categories") })

		res.json({ results })
	})
}

module.exports = getForCategory
