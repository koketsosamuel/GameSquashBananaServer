const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({

    category: {
        type: Number,
        required: true
    },

    subCategory: String,

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    thumb: String,

    tags: String,

    overallRating: Number,

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: Date

})

let Product = mongoose.model("Product", ProductSchema)

module.exports = Product