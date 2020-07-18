const add = require("./add")
const search = require("./search")
const update = require("./update")
const getOne = require("./getOne")
const getAll = require("./getAll")
const discontinue = require("./discontinue")
const continueP = require("./continue")
const addThumb = require("./addThumb")
const changeQuantity = require("./changeQuantity")
const getDiscontinued = require("./getDiscontinued")

module.exports = {
	add,
	discontinue,
	continue: continueP,
	update,
	getOne,
	getAll,
	search,
	addThumb,
	changeQuantity,
	getDiscontinued,
}
