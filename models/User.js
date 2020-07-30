const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    pwd: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        required: true,
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    roles: {
        type: Array,
        default: []
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: Date

})

let User = mongoose.model("User", UserSchema)

module.exports = User