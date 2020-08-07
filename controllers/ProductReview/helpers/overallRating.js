const ProductReview = require("../../../models/ProductReview")
const Product = require("../../../models/Product")

function overallRating(productArr = [], i = 0) {

    //if(productArr.length < 1)
    ProductReview.find({approved: true}, (err, res) => {
        
        if(err) return false
        let products = []

        for(let j = 0; j < res.length; j++) {

            if(!products.includes(res[j].product)) products.push(res[j].product)
            
        }
        
        productArr = products
    
        ProductReview.find({product: productArr[i], approved: true}, (err, res) => {
            
            //console.log(res)
            let productAvg = 0


            if(err) return false
            // calculate average
            for(let j = 0; j < res.length; j++) {
                productAvg += res[j].rating
            }

            productAvg /= res.length
            productAvg = Math.round(productAvg * 10) / 10

            Product.updateOne({_id: productArr[i]}, {
                overallRating: productAvg,
                nReviews: res.length 
            }, (err, r) => {
                console.log(productAvg, res.length)
                if(err) return false
                // recurse
                if((i + 1) < productArr.length) overallRating(productArr, i + 1)
            })

        })  
        

    })

}

module.exports = overallRating