const fileCOnf = require("../../config/file")
const Product = require("../../models/Product")
const errorMsg = require("../../util/errorMsg")
const imageResize = require("../../util/imageResize")
const ProductImage = require("../../models/ProductImage")

async function addThumb(req, res) {

	let imageExt = req.body.image.image.split(".")
	imageExt = imageExt[imageExt.length - 1]

	let outThum =
		fileCOnf.thumbnailFolder +
		"/" +
		req.params.productId +
		"."
		+
		imageExt

	await imageResize(req.body.image.image, outThum, fileCOnf.thumbnailSizeWidth, false)

	await Product.updateOne({_id: req.params.productId}, {
		thumb: outThum
	}, err => {
		if(err) return res.json({err: errorMsg("Error adding thumbnail")})
		res.json({msg: "Thumbnail added!"})
	})

	ProductImage.updateOne({
		_id: req.body.image._id
	}, {
		updatedAt: Date.now()
	}, err => {
	})
}

module.exports = addThumb
