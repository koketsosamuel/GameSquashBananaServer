const mongoose = require("mongoose")

const ProductReviewSchema = new mongoose.Schema({
	rating: {
		type: Number,
		required: true,
	},

	comment: {
		type: String,
		required: true,
	},

	user: {
		type: String,
		required: true,
	},

	nameOfUser: {
		type: String,
		required: true,
	},

	show: {
		type: Boolean,
		default: false,
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
})

let ProductReview = mongoose.model("ProductReview", ProductReviewSchema)

module.exports = ProductReview
