const Product = require("../../models/Product")
const errorMsg = require("../../util/errorMsg")
const fs = require("fs")
const removeImages = require("./helpers/removeImages")
const path = require("path")

function remove(req, res) {

    Product.findOne({_id: req.params.productId}, (err, product) => {
        
        if(err) return res.json({err: errorMsg("Error removing product")})
        
        if(product.sold > 0) {

            product.discontinued = true
            product.save(err => {

                if(err) return res.json({err: errorMsg("Error removing product!")})
                res.json({msg: "Product discontinued"})

            })

        } else {

            product.deleteOne((err, prod) => {
                if(err) return res.json({err: errorMsg("Error removing product!")})
                fs.unlink(path.join(__dirname + prod.thumb), () => {
                    removeImages(prod._id)
                    res.json({msg: "Product removed!"})
                })
            })

        }
 
       

    })

}

module.exports = remove