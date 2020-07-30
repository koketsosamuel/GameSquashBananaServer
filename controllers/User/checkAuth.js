const jwt = require("jsonwebtoken")
const authConf = require("../../config/auth")

function checkAuth(req, res) {

    try {
        
        if(!req.session.auth) throw "No token"
        
        let token = req.session.auth
        let user = jwt.verify(token, authConf.jwtKeyAuthKey)
        
        res.json({results: user})

    } catch(err) {
        res.json({})
    }

}

module.exports = checkAuth