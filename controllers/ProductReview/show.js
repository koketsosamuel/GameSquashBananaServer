const ProductReview = require("../../models/ProductReview")
const errorMsg = require("../../util/errorMsg")

function show(req, res) {
	ProductReview.updateOne(
		{ _id: req.params.reviewId },
		{ show: true },
		(err) => {
			if (err) return res.json({ err: errorMsg("Error showing review") })
			res.json({ msg: "Review will now be shown!" })
		}
	)
}

module.exports = show
