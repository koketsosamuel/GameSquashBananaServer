const mongoose = require("mongoose")

const ProductReviewSchema = new mongoose.Schema({

    rating: {
        type: Number,
        required: true
    },

    comment: {
        type: String,
        required: true
    },

    user: {
        type: String,
        required: true
    },

    product: {
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

let ProductReview = mongoose.model("ProductReview", ProductReviewSchema)

module.exports = ProductReview