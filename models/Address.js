const mongoose = require("mongoose")

const AddressSchema = new mongoose.Schema({

    recipientName: {
        type: String,
        required: true
    },

    recipientPhone: {
        type: String,
        required: true
    },

    additionalInfo: {
        type: String,        
    },

    address: {
        type: Object,
        required: true
    },

    coords: {
        type: String,        
    },

    user: {
        type: String,
        required: true,
        index: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: Date

})

let Address = mongoose.model("Address", AddressSchema)
module.exports = Address