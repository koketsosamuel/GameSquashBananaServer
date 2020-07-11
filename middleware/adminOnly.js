const errorMsg = require("../util/errorMsg")

module.exports = (req, res, next) => {

    if(req.user.isAdmin) {
        next()
    } else {
        next()
        // res.json({err: errorMsg("Not Authorized! :(")})
    }

}