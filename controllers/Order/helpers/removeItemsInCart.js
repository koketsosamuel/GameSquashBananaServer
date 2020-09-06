const CartItem = require("../../../models/CartItem")

function removeItemsInCart(items) {

    for(let i = 0; i < items.length; i++) {

        CartItem.deleteOne({_id: items[i]._id}, (err) => {
            if(err) console.log(err)
        })

    }

}

module.exports = removeItemsInCart