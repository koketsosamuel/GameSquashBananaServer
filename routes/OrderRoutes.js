const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
	totalAmount: {
		type: Number,
		required: true,
	},

	orderId: {
		type: Number,
		required: true,
	},

	address: {
		type: String,
		required: true,
	},

	recipientName: {
		type: String,
		required: true,
	},

	recipientPhone: {
		type: String,
		required: true,
	},

	additionalInfo: {
		type: String,
	},

	user: {
		type: String,
		required: true,
	},

	status: {
		type: String,
		required: true,
	},

	pos: Number,
})

let Order = mongoose.Schema("Order", OrderSchema)

module.exports = Order
