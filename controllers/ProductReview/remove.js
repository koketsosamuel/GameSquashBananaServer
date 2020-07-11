const ProductReview = require("../../models/ProductReview")
const errorMsg = require("../../util/errorMsg")

function remove(req, res) {
	ProductReview.findByIdAndRemove(req.params.reviewId, (err) => {
		if (err) return res.json({ err: errorMsg("Error removing review") })
		remove.json({ msg: "Review removed!" })
	})
}

/*
    remove review, this can only be done by admin or product manager
*/
