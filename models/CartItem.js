const mongoose = require("mongoose")

const CartItemSchema = new mongoose.Schema({

    quantity: {
        type: Number,
        defaultValue: 1
    },

    price: Number,

    user: {
        type: String,
        required: true,
        index: true
    },

    product: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: Date

})

let CartItem = mongoose.model("CartItem", CartItemSchema)

module.exports = CartItem