const errorMsg = require("./errorMsg")

module.exports = {
	filterAndSort,
	paginateRecords,
}

function filterAndSort(ModelFind, queryObj, res) {
	// price filtering
	if (queryObj.minPrice && queryObj.maxPrice) {
		ModelFind.where("price").gte(queryObj.minPrice).lt(queryObj.maxPrice)
	} else if (queryObj.minPrice) {
		ModelFind.where("price").gte(queryObj.minPrice)
	} else if (queryObj.maxPrice) {
		ModelFind.where("price").lt(queryObj.minPrice)
	}

	// category filtering
	if (queryObj.category) {
		ModelFind.where("category").equals(queryObj.category)
	}

	// subcategory filtering
	if (queryObj.category) {
		ModelFind.where("subCategory").equals(queryObj.subCategory)
	}

	// rating filtering
	if (queryObj.rating) {
		ModelFind.where("rating").gte(queryObj.rating)
	}

	// in stock rating
	if (queryObj.inStock) {
		ModelFind.where("quantity").gt(0)
	}

	// sort
	if (queryObj.sort) {
		ModelFind.sort(queryObj.sort)
	} else {
		ModelFind.sort("-createdAt")
	}

	paginateRecords(ModelFind, queryObj, res)
}

function paginateRecords(ModelFind, queryObj, res) {
	let page = queryObj.page || 1
	let perpage = queryObj.perpage || 18
	let pages = queryObj.pages || null

	if (page < 1) page = 1
	if (pages && page > pages) page = pages
	if (perpage < 1) perpage = 12

	if (pages) {
		ModelFind.skip((page - 1) * perpage)
			.limit(perpage)
			.exec((err, results) => {
				if (err)
					return {
						page,
						perpage,
						pages,
						results: [],
						err: errorMsg("Error fetching items"),
					}
				return res.json({ nav: { page, perpage, pages }, results })
			})
	} else {
		ModelFind.exec((err, results) => {
			if (err) return res.json({ err: errorMsg("Error fetching items") })

			pages = Math.ceil(results.length / perpage)

			let total = results.length

			let start = (page - 1) * perpage - 1
			if (start < 1) start = 0

			let _results = results.splice(start, perpage)
			res.json({ nav: { page, perpage, pages, total }, results: _results })
		})
	}
}
