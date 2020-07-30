const mongoose = require("mongoose")

let RandomUserSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    }
})

let RandomUser = mongoose.model("RandomUser", RandomUserSchema)
module.exports = RandomUser