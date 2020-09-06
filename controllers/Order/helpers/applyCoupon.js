function applyCoupon(coupon, total) {

    if(!coupon) return total
    else if(total >= coupon.minAmount) return (total - coupon.amountOff)
    else return total

}

module.exports = applyCoupon