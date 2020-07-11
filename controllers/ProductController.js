const errorMsg = require("../util/errorMsg")
const Product = require("../models/Product")

module.exports = {
	add,
	update,
	remove,
	getAll,
	getOne,
}

function add(req, res) {
	let newCat = new Product({
		name: req.body.name,
		description: req.body.description,
		category: req.body.category,
		subCategory: req.body.subCategory,
		tags: req.body.tags,
		price: req.body.price,
	})

	newCat.save((err) => {
		if (err) return res.json({ err: errorMsg("Error adding Product") })
		res.json({ msg: "Product created!" })
	})
}

async function remove(req, res) {
	Product.remove(
		{
			_id: req.params.id,
		},
		(err) => {
			if (err)
				return res.json({
					err: errorMsg("Error removing Product! Try again!"),
				})

			res.json({ msg: "Product removed!" })
		}
	)
}

function getAll(req, res) {
	let perpage = Number(req.query.perpage || 12)
	let page = Number(req.query.page || 1)
	let category = req.query.category || false
	let subCategory = req.query.subcategory || false

	sortVals: [
		{
			name: "oldest",
			val: { createdAt: 1 },
		},

		{
			name: "latest",
			val: { createdAt: -1 },
		},

		{
			name: "az",
			val: { name: 1 },
		},

		{
			name: "za",
			val: { name: -1 },
		},

		{
			name: "low",
			val: { price: 1 },
		},

		{
			name: "high",
			val: { price: -1 },
		},
	]

	let docs = {}
	let sort = { createdAt: -1 }

	// category and subcategory
	if (subCategory) {
		docs = {
			subCategory: subCategory,
		}
	} else if (category) {
		docs = {
			category: category,
		}
	}

	Product.find(docs)
		.sort({ createdAt: -1 })
		.skip((perpage - 1) * perpage)
		.limit(perpage)
		.exec(async (err, results) => {
			let pages

			if ((docs = {})) {
				await Product.estimatedDocumentCount((err, count) => {
					if (err)
						return res.json({ err: errorMsg("Unexpected Error") })
					pages = Math.ceil(count / perpage)
				})
			} else {
				await Product.countDocuments(docs, (err, count) => {
					if (err)
						return res.json({ err: errorMsg("Unexpected Error") })
					pages = Math.ceil(count / perpage)
				})
			}

			if (err)
				return res.json({ err: errorMsg("Error fetching Products") })

			res.json({ page, perpage, pages, products: results })
		})
}

function getOne(req, res) {
	Product.findOne(
		{
			_id: req.params.id,
		},
		async (err, product) => {
			if (err)
				return res.json({ err: errorMsg("Error fetching Product") })

			ProductImage.find({ product: product._id }, (err, images) => {
				if (err)
					return res.json({
						err: errorMsg("Error fetching Product images"),
					})
				product.images = images
				res.json({ results: product })
			})
		}
	)
}

function update(req, res) {
	Product.updateOne(
		{
			_id: req.params.id,
		},
		{
			name: req.body.name,
			description: req.body.description,
			category: req.body.category,
			subCategory: req.body.subCategory || null,
			tags: req.body.tags,
			price: req.body.price,
			updatedAt: Date.now,
		},
		(err) => {
			if (err)
				return res.json({ err: errorMsg("Error updating Product") })

			res.json({ msg: "Product updated!" })
		}
	)
}
