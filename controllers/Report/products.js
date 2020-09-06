const Product = require("../../models/Product")

async function products(req, res) {


    let productReports = {
        total: 0,
        outOfStock: 0,
        topFiveSelling: [],
        allProducts: []
    }

    Product.find({}, null, {sort: "-sold"}, (err, prods) => {
        
        productReports.total = prods.length
        productReports.allProducts = []

        for(let i = 0; i < prods.length; i++ ) {
            if(prods[i].quantity <= 0)productReports.outOfStock += 1
        }

        productReports.topFiveSelling = prods.splice(0, 5)

        res.json({results: productReports})


    })    

    // out of stock
    // in stock 
    // nearly out of stock  
    // top 5        

}

module.exports = products