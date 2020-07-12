const Product = require("../../models/Product")
const errorMsg = require("../../util/errorMsg")

function getOne(req, res) {
	Product.findOne(
		{
			_id: req.params.id,
		},
		(err, product) => {
			if (err)
				return res.json({ err: errorMsg("Error fetching Product") })

			res.json({ results: product })
		}
	)
}

module.exports = getOne
