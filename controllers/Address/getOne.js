const Address = require("../../models/Address")
const errorMsg = require("../../util/errorMsg")

function getOne(req, res) {
	Address.findOne({ _id: req.params.addressId }, (err, address) => {
		if (err) return res.json({ err: errorMsg("Error fetching address") })
		res.json({ address })
	})
}

module.exports = getOne
