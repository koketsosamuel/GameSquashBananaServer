const errorMsg = require("../../util/errorMsg")
const Product = require("../../models/Product")

function discontinue(req, res) {
	Product.updateOne(
		{ _id: req.params.productId },
		{
			discontinued: true,
		},
		(err) => {
			if (err)
				return res.json({
					err: errorMsg("Error discontinuing product"),
				})

			res.json({ msg: "Product discontinued" })
		}
	)
}

module.exports = discontinue
