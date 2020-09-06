const CartItem = require("../../../models/CartItem")

function removeInCart(productId) {

    CartItem.deleteMany({product: productId}, (err) => {
        if(err) "nothing"
    })

}

module.exports = removeInCart