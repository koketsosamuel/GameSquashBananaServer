const leo = require("leo-profanity")
const ProductReview = require("../../models/ProductReview")
const errorMsg = require("../../util/errorMsg")

leo.loadDictionary()

function update(req, res) {
	ProductReview.updateOne(
		{ _id: req.params.reviewId },
		{
			rating: Number(req.body.rating),
			comment: leo.clean(req.body.comment),
			show: false,
		},
		(err) => {
			if (err) return res.json({ err: errorMsg("Error updating review") })
			res.json({ msg: "Review updated" })
		}
	)
}

module.exports = update
