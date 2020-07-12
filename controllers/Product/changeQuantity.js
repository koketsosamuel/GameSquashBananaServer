const Product = require("../../models/Product")
const errorMsg = require("../../util/errorMsg")

function changeQuantity(req, res) {
	Product.updateOne(
		{ _id: req.params.productId },
		{
			quantity: Number(req.body.quantity),
		},
		(err) => {
			if (err)
				return res.json({ err: errorMsg("Error changing quantity") })
			res.json({ msg: "Quantity updated!" })
		}
	)
}

module.exports = changeQuantity
