const errorMsg = require("../../util/errorMsg")
const SubCategory = require("../../models/SubCategory")
const Product = require("../../models/Product")


function remove(req, res) {
	Product.updateMany({subCategory: req.params.subCategoryId}, {
		subCategory: null
	}, (err) => {

		if (err)
			return res.json({
				err: errorMsg("Error removing sub-category! Try again!"),
			})

		SubCategory.deleteOne(
			{
				_id: req.params.subCategoryId,
			},
			(err) => {
				if (err)
					return res.json({
						err: errorMsg("Error removing sub-category! Try again!"),
					})
	
				res.json({ msg: "sub-category removed!" })
			}
		)
	})
}

module.exports = remove
