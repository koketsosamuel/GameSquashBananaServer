const mongoose = require("mongoose")

const OrderStatusSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: Date


})

let OrderStatus = mongoose.model("OrderStatus", OrderStatusSchema)

module.exports = OrderStatus