const jwt = require("jsonwebtoken")
const authConf = require("../config/auth")
const errorMsg = require("../util/errorMsg")

module.exports =  verifyAuth

function verifyAuth(req, res, next) {

    try {

        if(!req.session.auth) throw "No token"

        let token = req.session.auth
        let user = jwt.verify(token, authConf.jwtKeyAuthKey)

        req.user = user
        next()

    } catch(err) {
        res.json({err: errorMsg("Not Authorized!")})
    }



}