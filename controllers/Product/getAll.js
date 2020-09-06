const Product = require("../../models/Product")
const paginate = require("./helpers/pagination")
const { filterAndSort } = require("../../util/dbHelpers")

function getAll(req, res) {

	let find
	
	if (req.query.s) find = Product.search(req.query.s)
	else find = Product.find({deletedAt: null})
	
	//find.where
	filterAndSort(find, req.query, res)
}

module.exports = getAll
