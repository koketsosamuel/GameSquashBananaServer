const database = require("../config/database")
const Sequelize = require("sequelize")
const Product = require("./Product")

const ProductImage = new mongoose.Schema({
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
})

ProductImage.belongsToMany(Product)

module.exports = ProductImage
