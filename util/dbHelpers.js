const errorMsg = require("./errorMsg")

module.exports = {
	filterAndSort,
	paginateRecords,
}

async function filterAndSort(ModelFind, queryObj, res) {
	
	let tempModel
	let total

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

	tempModel = ModelFind
	await tempModel.exec(async (err, results) => {
		
		total = await results.length
		
		// sort
		if (queryObj.sort) {
			ModelFind.sort(queryObj.sort)
		} else {
			ModelFind.sort("-createdAt")
		}

		paginateRecords(ModelFind, queryObj, res, total)

	})

	
}

async function paginateRecords(ModelFind, queryObj, res, total) {
	let page = Number(queryObj.page) || 1
	let perpage = Number(queryObj.perpage) || 18
	let pages = 1

	
	if (page < 1) page = 1
	if (perpage < 1) perpage = 12

	pages = Math.ceil(total / perpage)

	if (pages && page > pages) page = pages
	
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

				res.json({ nav: { page, perpage, pages, total }, results: results })

		})

	
}
