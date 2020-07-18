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
		async (err, results) => {
			if (err)
				return res.json({ err: errorMsg("Error fetching categories") })

			resultsFinal = [...results]
			sendRes = []

			for await (let i of results) {
				await SubCategory.find({ category: i._id }, (err, results) => {
					if (err)
						return res.json({
							err: errorMsg("Error fetching sub categories"),
						})
					i = {
						...i._doc,
						subs: results,
					}

					sendRes.push(i)
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
