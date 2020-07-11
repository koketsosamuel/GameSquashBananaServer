const ProductReview = require("../../models/ProductReview")
const errorMsg = require("../../util/errorMsg")

function getOne(req, res) {
	ProductReview.findById(req.params.reviewId, (err, results) => {
		if (err)
			return res.json({
				err: errorMsg("Unexpected error fetching review"),
			})

		res.json({ results })
	})
}

module.exports = getOne
