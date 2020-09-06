const mongoose = require("mongoose")
const search = require("mongoose-regex-search")

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        searchable: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        searchable: true
    },

    pwd: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        required: true,
        searchable: true,
    },

    isSuper: {
        type: Boolean,
        default: false
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    isProductManager: {
        type: Boolean,
        default: false
    },

    isOrderManager: {
        type: Boolean,
        default: false
    },

    isDeliveryManager: {
        type: Boolean,
        default: false
    },

    banned: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: Date

})

UserSchema.plugin(search)
let User = mongoose.model("User", UserSchema)

module.exports = User