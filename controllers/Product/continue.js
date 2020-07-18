const errorMsg = require("../../util/errorMsg")
const Product = require("../../models/Product")

function continueProduct(req, res) {
	Product.updateOne(
		{ _id: req.params.productId },
		{
			discontinued: false,
		},
		(err) => {
			if (err)
				return res.json({
					err: errorMsg("Error continuing product"),
				})

			res.json({ msg: "Product continued" })
		}
	)
}

module.exports = continueProduct
