const Order = require("../../models/Order")
const Product = require("../../models/Product")
const errorMsg = require("../../util/errorMsg")
const genOrderNum = require("./helpers/genOrderNum")
const removeItemsInCart = require("./helpers/removeItemsInCart")
const updateItems = require("./helpers/updateItems")
const applyCoupon = require("./helpers/applyCoupon")


async function add(req, res) {

    let data = req.body
    let err = false
    let address = data.address
    let items = data.items
  

    let total = 0

    for(let i = 0; i < items.length; i++) {
        await Product.findOne({_id: items[i].product._id}, (_err, prod) => {
            


            if(err) return err = _err

            if(prod.quantity == 0) {
                err = true
                return res.json({err: errorMsg("Oops, one of your products just went out of stock! Remove it in the cart")})
            }

            else if(prod.quantity < items[i].quantity) {
                err = true
                return res.json({err: errorMsg("Uh oh, we don't have enough quantity for one of the your products, modify it's quantiy in the cart")})
            }

            total += items[i].quantity * prod.taxedAmount

        })
    }

    total = Math.round(total)
    if(total < 600) total += 100
    if(err) return 0

    let newOrder = new Order({

        orderNum: genOrderNum(),
        user: req.user._id,
        userEmail: req.user.email,
        userPhone: req.user.phone,
        userName: req.user.name,
        totalAmount: req.body.coupon ? applyCoupon(req.body.couponObj, total) : total,
        address: address,
        items: data.items,
        amountBeforeCoupon: total,
        status: 1,
        deliveryFee: (total < 600) ? 100 : 0,
        coupon: req.body.coupon
    })

    newOrder.save(err => {
        if(err) {

            newOrder.orderNum = genOrderNum()        

            newOrder.save(err => {
                console.log(err)
                if(err) return res.json({err: errorMsg("Unexpected error")})
                removeItemsInCart(items)
                updateItems(items)
                res.json({msg: "Order Placed"})
            })
        }
        else {
            removeItemsInCart(items)
            updateItems(items)
            res.json({msg: "Order Placed"})
        }
    })



}

module.exports = add