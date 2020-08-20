const fs = require("fs")
const Banner = require("../../../models/Banner")
const errorMsg = require("../../../util/errorMsg")


function removeBanner(bannerId, res = false) {

    Banner.findOne({_id: bannerId}, (err, banner) => {
        
        if(res && err) return res.json({err: errorMsg("Error removing banner")})
        else if(err) return false
        
        fs.unlink(banner.image, () => {
            banner.deleteOne(err => {
                if(res && err) return res.json({err: errorMsg("Error removing banner")})
                if(res) return res.json({msg: "Banner removed!"})
            })
        })

    })

}

module.exports = removeBanner