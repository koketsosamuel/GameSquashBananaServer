const mongoose = require("mongoose")

const ProductImageSchema = new mongoose.Schema({
	
	image: {
		type: String,
		required: true,
	},

	product: {
		type: String,
		required: true,
		index: true,
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},

	updatedAt: {
		type: Date
	},
})

let ProductImage = mongoose.model("ProductImage", ProductImageSchema)
module.exports = ProductImage
