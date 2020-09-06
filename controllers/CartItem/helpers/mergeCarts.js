const CartItem = require("../../../models/CartItem")

function mergeCarts(randomUserId, userId) {

    CartItem.find({user: userId, wish: false}, (err, oldItems) => {

        CartItem.find({user: randomUserId}, (err, newItems) => {

            // merge
            for(let x = 0; x < oldItems.length; x++) {

                for(let y = 0; y < newItems.length; y++) {

                    // remove the old dupe
                    if(oldItems[x].product == newItems[y].product) {
                        oldItems[x].deleteOne()
                        break
                    }

                }

                //  change ownership from randomUser to User
                newItems[x].user = userId
                newItems[x].save()

            }

        })

    })

}

module.exports = mergeCarts