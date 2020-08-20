const mongoose = require("mongoose")

const AddressSchema = new mongoose.Schema({
	
	address1: {
		type: String,
		required: true,
	},

	address2: String,

	additionalInfo: String,

	postalCode: {
		type: Number,
		required: true
	},

	city: {
		type: String,
		required: true
	},

	surburb: {
		type: String,
		required: true
	},

	province: {
		type: String,
		required: true
	},

	coords: {
		type: String,
	},

	recipientName: {
		type: String,
		required: true
	},

	recipientPhone: {
		type: String,
		required: true
	},

	user: {
		type: String,
		required: true,
		index: true,
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},

	updatedAt: Date,
})

let Address = mongoose.model("Address", AddressSchema)
module.exports = Address

/*
    Address best stored as a single text area
    https://uxmovement.com/forms/why-you-should-use-a-text-area-for-address-form-fields/
*/
