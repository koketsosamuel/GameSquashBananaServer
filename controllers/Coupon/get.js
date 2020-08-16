const Coupon = require("../../models/Coupon")
const errorMsg = require("../../util/errorMsg")
const { paginateRecords } = require("../../util/dbHelpers")


function get(req, res) {

    Coupon.estimatedDocumentCount((err, c) => {
        if(err) return res.json({err: errorMsg("Error fetching coupons")})
        paginateRecords(Coupon.find({}), req.query, res, c)
    })

}

module.exports = get