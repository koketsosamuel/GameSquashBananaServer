const ProductReview = require("../../models/ProductReview")
const errorMsg = require("../../util/errorMsg")
const overallRating = require("./helpers/overallRating")
const leo = require("leo-profanity")

// init bad word filter
leo.loadDictionary()

async function add(req, res) {
	
	let bought = false
	let err = false
	let exists = false
	
	await ProductReview.findOne({ user: req.user._id, product: req.body.product }, (_err, rev) => {
		if(_err) return err = _err
		if(rev) {
			err = false
			exists = true
			rev.comment = leo.clean(req.body.comment)
			rev.rating = req.body.rating
			rev.approved = false
			rev.save(err => {
				if (err) return res.json({ err: errorMsg("Error updating review") })
				res.json({msg: "Review updated!"})
			})
		}
		
	})

	if (exists) {
		overallRating(req.body.product, false)
		return false
	}

	if (err) return res.json({ err: errorMsg("Error making review") })

	let newReview = new ProductReview({
		rating: Number(req.body.rating),
		comment: leo.clean(req.body.comment), // filter bad words
		user: req.user._id,
		nameOfUser: req.user.name,
		product: req.body.product,
		approved: bought,
	})

	newReview.save((err) => {
		if (err) return res.json({ err: errorMsg("Error adding your review") })
		res.json({ msg: "Review made!" })
		overallRating()
	})
}

module.exports = add

/*

    If user has not bought the product then the review will be checked first, by the admin or product manager. and the comment made by the user will be filtered for bad words

*/
