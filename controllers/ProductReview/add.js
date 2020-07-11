const OrderItem = require("../../models/OrderItem")
const errorMsg = require("../../util/errorMsg")
const leo = require("leo-profanity")

// init bad word filter
leo.loadDictionary()

async function add(req, res) {
	let bought = false

	// check if user has ever purchased product
	await OrderItem.findOne({ userId: req.user._id }, (err, item) => {
		if (err) return res.json({ err: errorMsg("Error making review") })
		if (item) bought = true
	})

	let newReview = new ProductReview({
		rating: Number(req.body.rating),
		comment: leo.clean(req.body.comment), // filter bad words
		user: req.user.email,
		nameOfUser: req.user.name,
		product: req.params.product,
		show: bought,
	})

	newReview.save((err) => {
		if (err) return res.json({ err: errorMsg("Error adding your review") })
		res.json({ msg: "Review made!" })
	})
}

module.exports = add

/*

    If user has not bought the product then the review will be checked first, by the admin or product manager. and the comment made by the user will be filtered for bad words

*/
