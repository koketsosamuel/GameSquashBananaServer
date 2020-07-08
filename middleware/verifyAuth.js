const jwt = require("jsonwebtoken")
const authConf = require("../config/auth")
const errorMsg = require("../util/errorMsg")

module.exports =  verifyAuth

function verifyAuth(req, res, next) {

    try {

        if(!req.signedCookies.auth) throw "No token"

        let token = req.signedCookies.auth
        let user = jwt.verify(token, authConf.jwtKeyAuthKey)

        req.user = user
        next()

    } catch(err) {
        res.json({err: errorMsg("Not Authorized!")})
    }


}