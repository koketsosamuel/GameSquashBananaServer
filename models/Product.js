const mongoose = require("mongoose")
const search = require("mongoose-regex-search")

const ProductSchema = new mongoose.Schema({
	
	category: String,
	
	subCategory: String,

	name: {
		type: String,
		required: true,
		searchable: true
	},

	description: {
		type: String,
		required: true,
	},

	price: {
		type: Number,
		required: true,
	},

	quantity: {
		type: Number,
		default: 0,
	},

	vat: {
		type: Boolean,
		default: true,
	},

	thumb: String,

	tags: {
		type: String,
		searchable: true
	},

	overallRating: Number,

	discontinued: {
		type: Boolean,
		default: false,
	},

	views: {
		type: Number,
		default: 0,
	},

	sold:{
		type: Number,
		default: 0
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},

	updatedAt: Date,

})

ProductSchema.plugin(search)
let Product = mongoose.model("Product", ProductSchema)

module.exports = Product
