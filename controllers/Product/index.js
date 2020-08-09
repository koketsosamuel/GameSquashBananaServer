const add = require("./add")
const update = require("./update")
const getOne = require("./getOne")
const getAll = require("./getAll")
const discontinue = require("./discontinue")
const continueP = require("./continue")
const addThumb = require("./addThumb")
const changeQuantity = require("./changeQuantity")
const remove = require("./remove")

module.exports = {
	add,
	discontinue,
	continue: continueP,
	update,
	getOne,
	getAll,
	addThumb,
	changeQuantity,
	remove
}
