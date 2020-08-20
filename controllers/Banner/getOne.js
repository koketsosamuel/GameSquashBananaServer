const Banner = require("../../models/Banner")
const errorMsg = require("../../util/errorMsg")

function getOne(req, res) {

    Banner.findOne({_id: req.params.bannerId}, (err, banner) => {
        if(err) return res.json({err: errorMsg("Error getting category!")})
        res.json({results: banner})
    })

}

module.exports = getOne