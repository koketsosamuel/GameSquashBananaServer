const errorMsg = require("../util/errorMsg")

module.exports = (req, res, next) => {

    if(req.user.isAdmin == "Y") {
        next()
    } else {
        res.json({err: errorMsg("Not Authorized! :(")})
    }

}