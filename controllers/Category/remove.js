const Category = require("../../models/Category")
const errorMsg = require("../../util/errorMsg")
const SubCategory = require("../../models/SubCategory")
const Product = require("../../models/Product")

function remove(req, res) {

	// delete all sub categories
	SubCategory.deleteMany({ category: req.params.categoryId }, (err) => {
		if (err)
			return res.json({
				err: errorMsg("Error removing category! Try again!"),
			})
		
		// then delete the category
		Category.deleteOne(
			{
				_id: req.params.categoryId,
			},
			async (err) => {
				if (err)
					return res.json({
						err: errorMsg("Error removing category! Try again!"),
					})

				// then update all the products
				Product.updateMany({category: req.params.categoryId}, {
					category: null,
					subCategory: null
				}, (err) => {
					
					res.json({ msg: "Category removed!" })

				})

			}
		)
	})
}

module.exports = remove
