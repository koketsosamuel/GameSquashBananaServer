const mongoose = require("mongoose")

const OrderItemSchema = new mongoose.Schema({

    quantity: {
        type: Number,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    product: {
        type: String,
        required: true
    },

    order: {
        type: String,
        required: true,
        index: true
    }

})

let OrderItem = mongoose.model("OrderItem", OrderItemSchema)

module.exports = OrderItem