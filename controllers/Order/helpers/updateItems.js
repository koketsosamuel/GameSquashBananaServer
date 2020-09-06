const Product = require("../../../models/Product")


function updateItems(items) {


    for(let i = 0; i < items.length; i++) {

        Product.findOne({_id: items[i].product._id}, (err, prod) => {

            if(prod)  {

                prod.quantity -= items[i].quantity
                prod.sold += items[i].quantity
                prod.save()
                
            }

        })

    }

}

module.exports = updateItems