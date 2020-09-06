const Order = require("../../models/Order")
const errorMsg = require("../../util/errorMsg")

function getAll(req, res) {

    let orderModel = Order.find({})
    let perpage = 15
    let page = Number(req.query.page) || 1

    orderModel.sort(req.query.sort || "-createdAt")

    orderModel.exec((err, orders) => {
        if(err) return res.json({err: errorMsg("Error fetching orders")})
        let orders_ = orders.splice((page - 1) * perpage, perpage)

        res.json({nav: {
            page,
            pages: Math.ceil(orders.length / perpage),
            total: orders.length
        }, results: orders_})

    })

}

module.exports = getAll