const ProductReview = require("../../models/ProductReview")
const errorMsg = require("../../util/errorMsg")
const overallRating = require("./helpers/overallRating")

async function approve(req, res) {
	
	let reviews = req.body.reviews
	let err = false

	for(let i = 0; i < reviews.length; i++) {
		
		await ProductReview.updateOne({ _id: reviews[i] }, { approved: true }, (_err) => {
			if(err) {
				err = _err
			}
		})
	}

	if (err) return res.json({ err: errorMsg("Error approving some review(s)") })
	res.json({ msg: "Reviews will now be shown!" })
	overallRating()	

}

module.exports = approve
