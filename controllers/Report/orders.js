const Order = require("../../models/Order")

async function orders(req, res) {

    let orderReports = {
        cancelled: 0,
        awaitingDelivery: 0,
        delivered: 0,
    }

    await Order.countDocuments({status: 0}, (err, count) => {
        orderReports.cancelled = count
    })

    await Order.countDocuments({status: 1}, (err, count) => {
        orderReports.awaitingDelivery = count
    })

    await Order.countDocuments({status: 2}, (err, count) => {
        orderReports.delivered = count
    })

    res.json({results: orderReports})

}

module.exports = orders