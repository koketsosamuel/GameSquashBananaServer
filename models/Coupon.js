const mongoose = require("mongoose")

let couponSchema = new mongoose.Schema({

    code: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    amountOff: Number,

    minAmount: {
        type: Number,
        default: 0
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: Date


})

const Coupon = mongoose.model("Coupon", couponSchema)
module.exports = Coupon