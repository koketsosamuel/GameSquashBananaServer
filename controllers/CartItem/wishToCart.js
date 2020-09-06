const CartItem = require("../../models/CartItem")
const errorMsg = require("../../util/errorMsg")
const checkExistence = require("./helpers/checkExistence")

async function wishToCart(req, res) {
	
	for(let i = 0; i < req.body.items.length;i++) {

        let exists = await checkExistence(req.user._id, req.body.items[i].product._id, false)

        if(!exists) 
            await CartItem.updateOne({ _id: req.body.items[i]._id, user: req.user._id }, {
                wish: false,
                quantity: 1
            },(err) => {
                if(err) return res.json({err: errorMsg("Could'nt move some of the items to wishlist")})
            })

        else 
            await CartItem.deleteOne({ _id: req.body.items[i]._id, user: req.user._id, wish: true },(err) => {
                if(err) return res.json({err: errorMsg("Could'nt move some of the items to cart")})
            })
	}

	res.json({msg: "Item(s) moved!"})
}

module.exports = wishToCart