const errorMsg = require("../../util/errorMsg")
const SubCategory = require("../../models/SubCategory")

function remove(req, res) {
	SubCategory.deleteOne(
		{
			_id: req.params.id,
		},
		(err) => {
			if (err)
				return res.json({
					err: errorMsg("Error removing sub-category! Try again!"),
				})

			res.json({ msg: "sub-category removed!" })
		}
	)
}

module.exports = remove
