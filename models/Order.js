const mongoose = require("mongoose")

let orderSchema = new mongoose.Schema({

    orderNum: {
        type: Number,
        required: true,
        unique: true
    },

    status: {
        type: Number,
        default: 1
    },

    userEmail: {
        type: String,
        required: true
    },

    userPhone: {
        type: String,
        required: true
    },

    userName: {
        type: String,
        required: true
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

    amountBeforeCoupon: Number,

    coupon: String,

    deliveryFee: {
        type: Number,
        default: 0
    },

    items: {
        type: Array,
        required: true
    },

    address: {
        type: Object,
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