const Order = require("../../models/Order")
const errorMsg = require("../../util/errorMsg")

function getOne(req, res) {

    Order.findOne({_id: req.params.orderId}, (err, order) => {
        if(err) return res.json({err: errorMsg("Error getting order info")})
        res.json({results: order})
    })    

}

module.exports = getOne