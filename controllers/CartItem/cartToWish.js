const CartItem = require("../../models/CartItem")
const errorMsg = require("../../util/errorMsg")
const checkExistence = require("./helpers/checkExistence")

async function cartToWish(req, res) {
	
	for(let i = 0; i < req.body.items.length;i++) {

        let exists = await checkExistence(req.user._id, req.body.items[i], true)

        if(!exists) 
            await CartItem.updateOne({ _id: req.body.items[i], user: req.user._id }, {
                wish: true,
                quantity: 1
            },(err) => {
                if(err) return res.json({err: errorMsg("Couldnt move some of the items to wishlist")})
            })

        else 
            await CartItem.deleteOne({ _id: req.body.items[i], user: req.user._id, wish: false },(err) => {
                if(err) return res.json({err: errorMsg("Couldnt move some of the items to wishlist")})
            })
	}

	res.json({msg: "Item(s) moved!"})
}

module.exports = cartToWish