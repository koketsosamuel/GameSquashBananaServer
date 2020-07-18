const mongoose = require("mongoose")

const AddressSchema = new mongoose.Schema({
	address: {
		type: String,
		required: true,
	},

	coords: {
		type: String,
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
