const fileCOnf = require("../../config/file")
const Product = require("../../models/Product")
const errorMsg = require("../../util/errorMsg")
const imageResize = require("../../util/imageResize")
const fs = require("fs")

function addThumb(req, res) {
	let thumb = req.file
	let outThum =
		fileCOnf.thumbnailFolder +
		"/" +
		"thumb" +
		String(Math.ceil(Math.random() * 777)) +
		thumb.originalname

	imageResize(thumb.path, outThum, fileCOnf.thumbnailSizeWidth)

	Product.findOne(
		{ _id: req.params.productId },

		(err, prod) => {
			if (err)
				return res.json({ err: errorMsg("Error adding thumbnail") })
			if (prod.thumb) fs.unlink(prod.thumb, () => {})
			prod.thumb = outThum
			prod.save((err) => {
				if (err)
					return res.json({
						err: errorMsg("Error replacing old thumb"),
					})
				res.json({ msg: "Thumbnail added!" })
			})
		}
	)
}

module.exports = addThumb
