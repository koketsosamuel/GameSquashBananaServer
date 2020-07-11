const Product = require("../../models/Product")
const ProductReview = require("../../models/ProductReview")
const errorMsg = require("../../util/errorMsg")

async function getHiddenPerCategory(req, res) {
	let categoryId = req.params.categoryId
	let prodArr = []
	let reviews = []

	let page = req.query.page || 1
	let perpage = req.query.perpage || 10
	let pages

	let nav = {
		page,
		pages: null,
		perpage,
		next: null,
		prev: null,
	}

	// get all products in category
	await Product.find({ category: categoryId }, (err, products) => {
		if (err)
			return res.json({
				err: errorMsg("Error looking up the pending reviews"),
			})
		prodArr = products
	})

	// get all reviews for each product
	for (let i = 0; i < prodArr.length; i++) {
		await ProductReview.find(
			{ product: prodArr[i]._id, show: false },
			(err, results) => {
				if (err)
					return res.json({
						err: errorMsg("Error looking up the pending reviews"),
					})

				reviews = [...reviews, ...results]
			}
		)
	}

	// check if length of reviews is not equal to zero
	if (reviews.length == 0)
		return res.json({
			results: [],
			nav,
		})

	pages = Math.ceil(reviews.length / perpage)

	// respond with reviews
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
		results: reviews.splice(perpage * (page - 1) - 1, perpage - 1),
	})
}
