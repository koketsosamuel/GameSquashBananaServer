const Product = require("../../models/Product")
const paginate = require("./helpers/pagination")
const errorMsg = require("../../util/errorMsg")

function search(req, res) {
	let nav = {
		page: req.query.page || 1,
		pages: null,
		perpage: req.query.perpage || 16,
		next: null,
		prev: null,
	}

	let rules = {
		inStock: req.query.inStock || false,
		category: req.query.category || false,
		subCategory: req.query.subCategory || false,
		minPrice: req.query.minPrice || false,
		maxPrice: req.query.maxPrice || false,
		minRating: req.query.minRating || false,
	}

	Product.find(
		{
			$or: {
				name: {
					$regex: req.query.q,
				},

				tags: {
					$regex: req.query.q,
				},
			},
		},
		(err, products) => {
			if (err)
				return res.json({
					err: errorMsg("Error getting your search results"),
				})
			res.json({ ...paginate(products, rules, nav) })
		}
	)
}

module.exports = search
