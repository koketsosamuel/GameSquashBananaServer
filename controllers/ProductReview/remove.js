const ProductReview = require("../../models/ProductReview")
const errorMsg = require("../../util/errorMsg")
const overallRating = require("./helpers/overallRating")

async function remove(req, res) {
	
	let reviews = req.body.reviews
	let err = false

	for(let i = 0; i < reviews.length; i++) {
		await ProductReview.deleteOne({_id: reviews[i]}, (_err) => {
			if(err) {
				err = _err
			}
		})
	}
	
	if (err) return res.json({ err: errorMsg("Error removing some review(s)") })
	res.json({ msg: "Reviews removed!" })
	overallRating()

}

module.exports = remove

/*
    remove review, this can only be done by admin or product manager
*/
