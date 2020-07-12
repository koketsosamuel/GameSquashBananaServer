let _rules = {
	Price: [min, max],
	minRating: 0,
	inStock: null,
	category: "",
	subCategory: "",
}

let _nav = {
	pages: null,
	page: 1,
	perpage: 16,
	next: null,
	prev: null,
}

function paginate(array, rules = _rules, nav = _nav) {
	let products = []

	for (let i = 0; i < array.length; i++) {
		let put = true

		if (rules.minPrice) {
			if (array[i].price < rules.minPrice) {
				put = false
				continue
			}
		}

		if (rules.maxPrice) {
			if (array[i].price > rules.maxPrice) {
				put = false
				continue
			}
		}

		if (rules.minRating) {
			if (array[i].overallRating < rules.minRating) {
				put = false
				continue
			}
		}

		if (rules.inStock) {
			if (array[i].quantity == 0) {
				put = false
				continue
			}
		}

		if (rules.category) {
			if (rules.category != array[i].category) {
				put = false
				continue
			}
		}

		if (rules.subCategory) {
			if (rules.subCategory != array[i].subCategory) {
				put = false
				continue
			}
		}

		if (put) {
			products.push(array[i])
		}
	}

	if (nav.perpage < 5) nav.perpage = 5
	if (nav.page < 1) nav.page = 1
	nav.pages = Math.ceil(products.length / nav.perpage)
	if (nav.page > pages) nav.page = pages
	if (nav.page < pages) nav.next = page + 1
	if (nav.page > 1) nav.prev = page - 1

	let results = products.splice(
		(nav.page - 1) * nav.perpage - 1,
		nav.perpage - 1
	)

	return { nav, results }
}

module.exports = paginate
