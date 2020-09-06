const Order = require("../../models/Order")
const errorMsg = require("../../util/errorMsg")

function changeStatus(req, res) {

    Order.updateOne({_id: req.params.orderId}, {status: req.body.status}, err => {
        if(err) return res.json({err: errorMsg("Error updating status")})
        res.json({msg: "Update successful!"})
    })

}

module.exports = changeStatus