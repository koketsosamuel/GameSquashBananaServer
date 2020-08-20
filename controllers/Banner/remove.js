const removeBanner = require("./helpers/removeBanner");

function remove(req, res) {
    removeBanner(req.params.bannerId, res)
}

module.exports = remove