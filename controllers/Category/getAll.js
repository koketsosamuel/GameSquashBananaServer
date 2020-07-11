const Category = require("../../models/Category")
const SubCategory = require("../../models/SubCategory")
const errorMsg = require("../../util/errorMsg")

async function getAll(req, res) {
	let resultsFinal = []

	await Category.find({}, { sort: { name: 1 } }, (err, results) => {
		if (err) return res.json({ err: errorMsg("Error fetching categories") })

		resultsFinal = results

		for (let i = 0; i < resultsFinal.length; i++) {
			await SubCategory.find({ category: results[i] }, (err, results) => {
                if (err) return res.json({ err: errorMsg("Error fetching categories") })
                resultsFinal[i].subs = results
            })
		}
	})

	res.json({ results: resultsFinal })
}

module.exports = getAll

/*
    get all categories and they sub categories
*/