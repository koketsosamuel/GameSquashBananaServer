const mongoose = require("mongoose")

let couponSchema = new mongoose.Schema({

    code: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    percOff: Number,

    amountOff: Number,

    minAmount: {
        type: Number,
        default: 0
    },

    maxAmountOff: Number,

    approved: {
        type: Boolean,
        default: false
    },

    startDate: {
        type: Date,
        required: true
    },

    endDate: Date,

    nUses: Number,

    maxNUses: Number,

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: Date


})

const Coupon = mongoose.model("Coupon", couponSchema)
module.exports = Coupon