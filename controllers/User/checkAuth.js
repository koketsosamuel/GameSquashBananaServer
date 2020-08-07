const jwt = require("jsonwebtoken")
const authConf = require("../../config/auth")
const User = require("../../models/User")

function checkAuth(req, res) {

    try {
        
        if(!req.session.auth) throw "No token"
        
        let token = req.session.auth
        let user = jwt.verify(token, authConf.jwtKeyAuthKey)

        User.findOne({_id: user._id}, (err, _user) => {

            if(err || !user) throw err
            res.json({results: _user})

        })
        

    } catch(err) {
        req.session = null
        res.json({})
    }

}

module.exports = checkAuth