const mongoose = require("mongoose")

const SubCategorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    category: {
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

let SubCategory = mongoose.model("SubCategory", SubCategory)

module.exports = SubCategory