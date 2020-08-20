const RandomUser = require("../models/RandomUser")
const jwt = require("jsonwebtoken")
const authConf = require("../config/auth")

module.exports = (req, res, next) => {
    
    console.log(req.session)

    try {

        if(req.session.auth) {
            
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


        let newRU = new RandomUser({})

        newRU.save((err, doc) => {
            if(err) return res.json({err: errorMsg("Unexpected Error")})

            req.session.randomUser = {...doc._doc}

            req.user = doc._doc
            console.log(req.session.randomUser)
            next()
        })
        
    }

}