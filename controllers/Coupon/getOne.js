const Coupon = require("../../models/Coupon")
const errorMsg = require("../../util/errorMsg")

function getOne(req, res) {

    Coupon.findOne({code: req.params.couponCode}, (err, coupon) => {
    
        if(err) return res.json({err: errorMsg("Error fetching coupon")})
        res.json({results: coupon})

    })

}

module.exports = getOne