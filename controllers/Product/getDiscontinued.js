const Product = require("../../models/Product")
const paginate = require("./helpers/pagination")

function getDiscontinued(req, res) {

	console.log("HI");

	let category = req.query.category || false
	let subCategory = req.query.subCategory || false
	let sort = req.query.sort || "-createdAt"

	let query = { "discontinued": true }

	let nav = {
		page: req.query.page || 1,
		pages: null,
		perpage: req.query.perpage || 16,
		next: null,
		prev: null,
	}

	let rules = {
		inStock: req.query.inStock || false,
		minPrice: req.query.minPrice || false,
		maxPrice: req.query.maxPrice || false,
		minRating: req.query.minRating || false,
	}

	if (category) {
		query = { "category": category }
	}

	if (subCategory) {
		query.subCategory = subCategory
	}

	Product.find({ ...query }, null, { sort: sort }, (err, results) => {
		console.log(results)
		if (err) return res.json({ err: errorMsg("Error fetching products") })
		res.json({ ...paginate(results, rules, nav) })
	})
}

module.exports = getDiscontinued
