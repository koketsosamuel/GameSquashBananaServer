const mongoose = require("mongoose")

const CardSchema = new mongoose.Schema({

    cardType: {
        type: String,
        required: true
    },

    cardNumber: {
        type: String,
        required: true
    },

    cardExp: {
        type: String,
        required: true
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

let Card = mongoose.model("CardSchema", CardSchema)

module.exports = Card