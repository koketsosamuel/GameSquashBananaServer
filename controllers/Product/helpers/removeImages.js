const fs  = require("fs")
const ProductImage = require("../../../models/ProductImage")
const path = require("path")

function removeImages(productId) {

    ProductImage.find({product: productId}, (err, images) => {


        for(let i  = 0; i < images.length; i++) {
            fs.unlink(path.join(__dirname + images[i].image), () => {
                images[i].deleteOne(err => {
                    if(err) console.log(err)
                })
            })
        }
        

    })

}

module.exports = removeImages