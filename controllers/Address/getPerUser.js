const Address = require("../../models/Address")
const errorMsg = require("../../util/errorMsg")

function getPerUser(req, res) {
	Address.find(
		{ user: req.user._id },
		null,
		{
			sort: "-createdAt",
			limit: 10
		},
		(err, addresses) => {
			if (err)
				return res.json({
					err: errorMsg("Error fetching your addresses"),
				})
			res.json({ results: addresses })
		}
	)
}

module.exports = getPerUser
