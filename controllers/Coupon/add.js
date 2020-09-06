const Coupon = require("../../models/Coupon")
const errorMsg = require("../../util/errorMsg")

function add(req, res) {

    let newCoupon = new Coupon({

        code: req.body.code,
        amountOff: req.body.amountOff,
        minAmount: req.body.minAmount
        
    })

    newCoupon.save(err => {
        if(err) return res.json({err: errorMsg("Error adding coupon")})
        res.json({msg: "Coupon added! "}) //+ (req.user.isSuper ? "" : "Waiting approval.")})
    })

}

module.exports = add