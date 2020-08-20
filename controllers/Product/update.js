const errorMsg = require("../../util/errorMsg")
const Product = require("../../models/Product")

function update(req, res) {
	Product.updateOne(
		{
			_id: req.params.productId,
		},
		{
			name: req.body.name,
			description: req.body.description,
			category: req.body.category,
			subCategory: req.body.subCategory || null,
			tags: req.body.tags,

			price: req.body.price,
		
			// calculate vat amount and round to two decimal places
			taxAmount: 
				Math.round(
					Number(
						req.body.price * (req.body.vat ? getSettings("../../settings.json").vat : 0)
					) * 100) / 100,

			updatedAt: Date.now(),
			quantity: req.body.quantity,
			vat: req.body.vat,
		},
		(err) => {
			if (err)
				return res.json({ err: errorMsg("Error updating Product") })

			res.json({ msg: "Product updated!" })
		}
	)
}

module.exports = update
