const ProductReview = require("../../models/ProductReview")
const errorMsg = require("../../util/errorMsg")
const dbHelpers = require("../../util/dbHelpers")

async function getPerProduct(req, res) {
	
	let queryObj = { product: req.params.productId, approved: true }

	let p = ProductReview.find(queryObj)
		.sort({
			createdAt: -1,
		})

	await ProductReview.countDocuments(queryObj, (err, count) => {
		if(err) return res.json({err: errorMsg("Error fetching reviews")})
		dbHelpers.paginateRecords(p, req.query, res, count)
	})


		
}

module.exports = getPerProduct
