const sharp = require("sharp")
const fs = require("fs")
const config = require("../config/file")

module.exports = async function optimize(
	inputUrl,
	outputUrl,
	width = config.imageResizeWidth,
	remove = true,
	ratio = 1
) {
	try {

		let background = {
			r: 255,
			g: 255,
			b: 255,
			alpha: 1,
		}

		if(ratio != 1) {
			background.r = 103
			background.g = 58
			background.b = 183
		}

		await sharp(inputUrl)
			.resize(width, width * ratio, {
				fit: "contain",
				background
			})
			.toFile(outputUrl)

		if(remove) fs.unlink(inputUrl, (err) => {
			return false
		})
		
	} catch (err) {
	}
}
