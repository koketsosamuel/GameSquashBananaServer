const CartItem = require("../../../models/CartItem");

async function checkExistence(user, product, wish = false) {

    let res = false

    await CartItem.findOne({user, product, wish }, async (err, results) => {
        res = await results || false
    })
    
    return res

}

module.exports = checkExistence