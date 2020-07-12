const ProductImage = require("../../models/ProductImage")
const errorMsg = require("../../util/errorMsg")

function remove(req, res) {
	ProductImage.findOneAndRemove({ _id: req.params.imageId }, (err) => {
		if (err) return res.json({ err: errorMsg("Error removing image") })
		res.json({ msg: "Image removed" })
	})
}

module.exports = remove
