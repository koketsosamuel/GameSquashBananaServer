const CartItem = require("../../../models/CartItem")
const findDupes = require("./findDupes")

function mergeCarts(randomUserId, userId) {

    CartItem.find().or([{user: randomUserId}, {user: userId}]).where("wish").equals(false).exec(async (err, items_r) => {

        for(let i = 0; i < items_r.length; i++) {
            if(items_r[i].user != userId) {
                items_r[i].user = userId
                await items_r[i].save()
            }
        }

        let dupes = findDupes(items_r)
        let item = {
            product: null,
            quantity: 0,
            user: userId
        }

        for(let i = 0; i < dupes.length; i++) {

            item.product = dupes[i][0].product
            for(let j = 0; j < dupes[i].length; j++) {
                item.quantity += dupes[i][j].quantity
            }
            CartItem.deleteMany({product: item.product, user: userId, wish:false}, (err) => {
                if(err) return 0
                let newCI = new CartItem(item)
                newCI.save()
            })

        }

    })

}

module.exports = mergeCarts