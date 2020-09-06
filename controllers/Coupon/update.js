const Coupon = require("../../models/Coupon")
const errorMsg = require("../../util/errorMsg")

function update(req, res) {

    Coupon.updateOne({_id: req.params.couponId}, {

        code: req.body.code,
        amountOff: req.body.amountOff,
        minAmount: req.body.minAmount,
        updateAt: Date.now()

    }, err => {
        //console.log(err)
        if(err) return res.json({err: errorMsg("Error updating coupon")})
        res.json({msg: "Coupon updated! "}) //+ (req.user.isSuper ? "" : "Waiting approval.")})
    })

}

module.exports = update