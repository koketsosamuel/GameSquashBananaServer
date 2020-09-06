const Order = require("../../models/Order")
const errorMsg = require("../../util/errorMsg")


function getPerUser(req, res) {

    Order.find({user: req.user._id},null, {sort: "-createdAt"}, (err, orders) => {
        if(err) return res.json({err: errorMsg("Error fetching your orders")})
        res.json({results: orders})
    })

}

module.exports = getPerUser