const Product = require("../../models/Product")
const errorMsg = require("../../util/errorMsg")


function remove(req, res) {

    Product.findOne({_id: req.params.productId}, (err, product) => {
        
        if(err) return res.json({err: errorMsg("Error removing product")})
        if(product.sold > 0) return res.json({
            err: errorMsg("Product can't removed, it has been bought before!")
        })

        product.deletedAt = Date.now()
        product.save(err => {
            if(err) return res.json({err: errorMsg("Error removing product")})
            res.json({msg: "Product will be removed in 30 days"})
        })

    })

}

module.exports = remove