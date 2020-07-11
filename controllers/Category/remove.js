const Category = require("../../models/Category")
const errorMsg = require("../../util/errorMsg")

async function remove(req, res) {
	Category.remove(
		{
			_id: req.params.id,
		},
		(err) => {
			if (err)
				return res.json({
					err: errorMsg("Error removing category! Try again!"),
				})

			res.json({ msg: "Category removed!" })
		}
	)
}

module.exports = remove
