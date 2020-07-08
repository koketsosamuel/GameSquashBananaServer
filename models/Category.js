const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    description: {
        type: String,
        required: true
    },

    manager: String,

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: Date

})

let Category = mongoose.model("Category", CategorySchema)

module.exports = Category