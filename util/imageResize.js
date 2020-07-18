const sharp = require("sharp")
const fs = require("fs")
const config = require("../config/file")

module.exports = async function optimize(
	inputUrl,
	outputUrl,
	width = config.imageResizeWidth
) {
	try {
		await sharp(inputUrl)
			.resize(width, width, {
				fit: "contain",
				background: {
					r: 255,
					g: 255,
					b: 255,
					alpha: 1,
				},
			})
			.toFile(outputUrl)

		fs.unlink(inputUrl, (err) => {
			return false
		})
	} catch (err) {
		console.log(err)
	}
}
