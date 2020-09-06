const RandomUser = require("../models/RandomUser")
const jwt = require("jsonwebtoken")
const authConf = require("../config/auth")

module.exports = (req, res, next) => {

    try {


        if(req.session && req.session.auth > 0) {
            
            let token = req.session.auth
            let user = jwt.verify(token, authConf.jwtKeyAuthKey)

            if(user._id) req.user = user
            else req.user = user._doc
            
            next()

        } else if(req.session.randomUser) {
            req.user = {_id: req.session.randomUser}
            next()
        } else {
            throw "Error"
        }


    } catch(err) {

        if(req.session.randomUser) {
            req.user = req.session.randomUser
            return 0
        }

        let newRU = new RandomUser({})

        newRU.save((err, doc) => {
            if(err) return res.json({err: errorMsg("Unexpected Error")})

            req.session.randomUser = {...doc._doc}

            req.user = doc._doc
            next()
        })
            
    }

}