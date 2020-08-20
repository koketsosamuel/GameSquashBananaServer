const Banner = require("../../models/Banner")
const errorMsg = require("../../util/errorMsg")

function getAll(req, res) {

    Banner.find({}, (err, banners) => {
        if(err) return res.json({err: errorMsg("Error fetching banners")})
        res.json({results: banners})
    })

}

module.exports = getAll