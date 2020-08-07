const Product = require("../../models/Product")
const ProductReview = require("../../models/ProductReview")
const errorMsg = require("../../util/errorMsg")

async function getUnapproved(req, res) {

	ProductReview.countDocuments({approved: false}, (err, count) => {


		let page = Number(req.query.page) || 1
		let perpage = Number(req.query.perpage) || 12
		let pages 

		if(page < 1) page = 1
		if(perpage < 1) perpage = 12
		
		pages = Math.ceil(count / perpage)

		if(page > pages && pages != 0) page = pages

		if(err) return res.json({err: errorMsg("Error fetching reviews")})

		ProductReview.find({approved: false})
			.skip(perpage * (page - 1))
			.limit(perpage)
			.exec(async (err, revs) => {

				let results = []
				if(err) return res.json({err: errorMsg("Error fetching reviews")})

				
				for(let i =  0; i < revs.length; i++) {

					// get product name
					await Product.findOne({_id: revs[i].product}, (err, prod) => {
						results.push({...revs[i]._doc, productName: prod.name})
					})

				}

				res.json({nav: {page, perpage, pages}, results})

			})

	})

}

module.exports = getUnapproved