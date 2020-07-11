const ProductReview = require("../../models/ProductReview")
const errorMsg = require("../../util/errorMsg")

// ?page=3&?perpage=10
function getPerProduct(req, res) {
	let perpage = Number(req.query.perpage) || 10
	let page = Number(req.query.page) || 1
	let pages
	let nav = {
		next: null,
		prev: null,
		pages: null,
		page,
	}

	ProductReview.find({ product: req.params.productId, show: true })
		.sort({
			createdAt: -1,
		})

		.exec((err, results) => {
			if (err)
				return res.json({
					err: errorMsg("Unexpected error while fetching reviews"),
				})

			pages = Math.ceil(results.length / perpage)

			if (page < 1) page = 1
			if (page > pages) page = pages
			if (perpage < 5) perpage = 5

			if (page > 1) nav.prev = page - 1
			if (page < pages) nav.next = page + 1

			nav.pages = pages
			nav.page = page
			nav.perpage = perpage

			res.json({
				nav,
				results: results.splice(perpage * (page - 1) - 1, perpage - 1),
			})
		})
}

module.exports = getPerProduct

/*
    Get all reviews for each product with pagination
*/
