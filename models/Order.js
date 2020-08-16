const mongoose = require("mongoose")

let orderSchema = new mongoose.Schema({

    orderNum: {
        type: Number
    },

    user: {
        type: String,
        required: true,
        index: true
    },

    totalAmount: {
        type: Number,
        required: true
    },

    coupon: String,

    deliveryFee: {
        type: Number,
        default: 0
    },

    items: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date
    }

})

const Order = mongoose.model("Order", orderSchema)
module.exports = Order