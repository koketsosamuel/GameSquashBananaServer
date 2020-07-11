const errorMsg = require("../../util/errorMsg")
const Category = require("../../models/Category")

function getOne(req, res) {
	Category.findOne(
		{
			_id: req.params.id,
		},
		(err, results) => {
			if (err)
				return res.json({ err: errorMsg("Error fetching category") })

			res.json({ results })
		}
	)
}

module.exports = getOne
