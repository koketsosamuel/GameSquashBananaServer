const Category = require("../../models/Category")
const Product = require("../../models/Product")

async function category(req, res) {

    let catReport = {
        categories: [],
        total: 0,
        categoryProducts: []
    }

    await Category.find({}, null, {sort: "-name"}, (err, cats) => {
        catReport.categories = cats
        catReport.total = cats.length
    })

    for(let i = 0; i < catReport.categories.length; i++) {
        let cat = catReport.categories[i]
        await Product.countDocuments({category: cat._id}, (err, count) => {
            catReport.categoryProducts.push({category: cat.name, products: count})
        })
    }

    res.json({results: catReport})

}

module.exports = category