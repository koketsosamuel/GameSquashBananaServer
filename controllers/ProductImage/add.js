const fs = require("fs")
const ProductImage = require("../../models/ProductImage")
const errorMsg = require("../../util/errorMsg")
const imageResize = require("../../util/imageResize")
const { optimizedImgFolder } = require("../../config/file")

function add(req, res) {

	let image = req.file
	let outpath =
		optimizedImgFolder + "/" + Date.now() + req.file.originalname
	imageResize(image.path, outpath)

	let newPI = new ProductImage({
		image: outpath,
		product: req.params.productId,
	})

	newPI.save((err) => {
		if (err) {
			fs.unlink(outpath, () => {
				res.json({ err: errorMsg("Error adding image") })
			})
		}

		res.json({ msg: "Image added!" })
	})
}

module.exports = add
