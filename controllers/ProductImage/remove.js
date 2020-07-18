const ProductImage = require("../../models/ProductImage")
const errorMsg = require("../../util/errorMsg")
const fs = require("fs")

function remove(req, res) {
	ProductImage.findOneAndRemove(
		{ _id: req.params.imageId },
		(err, imageDoc) => {
			if (err) return res.json({ err: errorMsg("Error removing image") })
			fs.unlink(imageDoc.image, () => {
				res.json({ msg: "Image removed" })
			})
		}
	)
}

module.exports = remove
