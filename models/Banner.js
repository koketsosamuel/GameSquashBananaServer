const mongoose = require("mongoose")

let bannerSchema = new mongoose.Schema({

    link: String,

    title: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    removeAt: String

})

const Banner = mongoose.model("Banner", bannerSchema)
module.exports = Banner