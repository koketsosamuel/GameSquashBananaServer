const fileCOnf = require("../../config/file")
const Product = require("../../models/Product")
const errorMsg = require("../../util/errorMsg")

function addThumb(req, res) {
	let thumb = req.file
	let outThum =
		fileCOnf.thumbnailFolder +
		"thumb" +
		String(Math.ceil(Math.random() * 777)) +
		thumb.originalname

	imageResizeWidth(thumb.path, outThum, fileCOnf.thumbnailSizeWidth)

	Product.findOne(
		{ _id: req.params.productId },

		(err, prod) => {
			if (err)
				return res.json({ err: errorMsg("Error adding thumbnail") })
			if (prod.thumb)
				return fs.unlink(prod.thumb, () => {
					prod.thumb = outThum
					prod.save((err) => {
						if (err)
							return res.json({
								err: errorMsg("Error replacing old thumb"),
							})
						res.json({ msg: "Thumbnail added!" })
					})
				})

			res.json({ msg: "Thumbnail added!" })
		}
	)
}

module.exports = addThumb
