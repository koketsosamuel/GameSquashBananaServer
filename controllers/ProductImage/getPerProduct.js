const ProductImage = require("../../models/ProductImage")
const errorMsg = require("../../util/errorMsg")

function getPerProduct(req, res) {
	ProductImage.find({ product: req.params.productId }, null, {sort: "-updatedAt"}, (err, images) => {
		if (err) return res.json({ err: errorMsg("Error getting images") })
		res.json({ results: images })
	})
}

module.exports = getPerProduct
