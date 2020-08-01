const Category = require("../../models/Category")
const SubCategory = require("../../models/SubCategory")
const errorMsg = require("../../util/errorMsg")

async function getAll(req, res) {
	let resultsFinal = []
	let sendRes

	await Category.find(
		{},
		null,
		{ sort: { name: 1 } },
		async (err, _results) => {
			if (err)
				return res.json({ err: errorMsg("Error fetching categories") })

			resultsFinal = [..._results]
			sendRes = []

			for (let i = 0; i < _results.length; i++) {
				await SubCategory.find({ category: _results[i]._id }, (err, results) => {
					if (err)
						return res.json({
							err: errorMsg("Error fetching sub categories"),
						})
					
					sendRes.push({
						..._results[i]._doc,
						subs: results,
					})
				})
			}
			
			res.json({ results: sendRes })
			
		}
	)
}

module.exports = getAll

/*
    get all categories and they sub categories
*/
