const Coupon = require("../../models/Coupon");
const errorMsg = require("../../util/errorMsg");

function remove(req, res) {

    Coupon.findOne({_id: req.params.couponId}, (err, coupon) => {

        if(err) return res.json({err: errorMsg("Error removing coupon")})
        if(coupon.nUses > 0) return res.json({err: errorMsg("Error removing coupon, it has been used!")})
        coupon.deleteOne(err => {
            if(err) return res.json({err: errorMsg("Error removing coupon")})
            res.json({msg: "Coupon removed!"})
        })

    })

}

module.exports = remove