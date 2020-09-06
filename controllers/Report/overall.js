const Category = require("../../models/Category")
const Product = require("../../models/Product")
const User = require("../../models/User")
const Order = require("../../models/Order")

async function overall(req, res) {

    let overall = {
        nCategories: null,
        nProducts: null,
        nUsers: null,
        nOrders: null
    }

    await Category.estimatedDocumentCount((err, count) => {
        overall.nCategories = count
    })

    await User.estimatedDocumentCount((err, count) => {
        overall.nUsers = count
    })

    await Product.estimatedDocumentCount((err, count) => {
        overall.nProducts = count
    })

    await Order.estimatedDocumentCount((err, count) => {
        overall.nOrders = count
    })

    res.json({results: overall})

}

module.exports = overall