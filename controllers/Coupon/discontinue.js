const Coupon = require("../../models/Coupon")
const errorMsg = require("../../util/errorMsg")

function discontinue(req, res) {

    Coupon.updateOne({_id: req.params.couponId}, {
        endDate: Date.now()
    }, err => {
        if(err) return res.json({err: errorMsg("Error removing coupon")})
        res.json({msg: "Coupon discontinued"})
    })

}

module.exports = discontinue