const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const authConf = require("../config/auth")
const errMsg = require("../util/errorMsg")
const User = require("../models/User")

module.exports = {

    register,
    login,
    passResetLink, 
    passReset

}


function register(req, res) {

    let user = req.body
    let newUser

    // hash password
    bcrypt.hash(user.pwd, authConf.saltRounds, (err, hash) => {

        if(err) return res.json({err: errMsg("Unexpected Error")})
        user.pwd = hash

        newUser = new User({
            name: user.name,
            pwd: user.pwd,
            email: user.email,
            phone: user.phone
        })

        newUser.save(err => {
            if(err) return res.json({err: errMsg("Error registering")})
            res.json({msg: "You are now registered!"})
        })

    })    

}


async function login(req, res) {

    User.findOne({email: req.body.email}, (err, user) => {

        if(err || !user) return res.json({err: errMsg("Account not found!")})

        // check if passwords match
        bcrypt.compare(req.body.pwd, user.pwd, (err, match) => {
            
            if(err) {
                res.json({err})
            } else if(match) {
                
                // create and issue token
                let token = jwt.sign(user, authConf.jwtKeyAuthKey, {expiresIn: "1h"})
                res.cookie("auth", token, {
                    signed: true,
                    httpOnly: true
                })
                res.json({msg:"Logged In"})

            } else {
                res.json({err: errMsg("password incorrect")})
            }
        })

    })

}

async function passResetLink(req, res) {

    let email = req.body.email

    User.findOne({email: req.body.email}, (err, user) => {

        if(err || !user) return res.json({err: errMsg("Email not found!")})

        try {
    
            // sign token
            let token = jwt.sign(user, authConf.jwtKeyPwdResetKey)
            res.json({token, msg: "Reset link sent to " + email})
            console.log(token)
    
        } catch(err) {
            console.log(err)
            res.json({err: errMsg("Error with token")})
        }


    })
    

}

function passReset(req, res) {

    let token = req.params.token
    
    // hash password
    bcrypt.hash(req.body.pwd, authConf.saltRounds, async (err, hash) => {

        let user

        if(err) return res.json({err: errMsg("Unexpected Error!")})

        try {
            
            // get user data from token
            user = await jwt.verify(token, authConf.jwtKeyPwdResetKey)
            
            // perform the update
            User.updateOne({
                email: user.email
            }, {
                pwd:hash,
                updatedAt: Date.now
            }, err => {
                if(err) return res.json({err: errMsg("Error updating password, please retry")})
                res.json({results, msg: "password reset was successful"})
            })

        } catch(err) {
            res.json({err: errMsg("Link expired, or incorrect link")})
        }
    })

}
