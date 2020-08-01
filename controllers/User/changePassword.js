const User = require("../../models/User")
const bcrypt = require("bcrypt")
const authConf =require("../../config/auth")
const errorMsg = require("../../util/errorMsg")

async function changePassword(req, res) {

    let user = {}

    await User.findOne({_id: req.user._id}, (err, _user) => {
        if(err) return res.json({err: errorMsg("Error changing password")})
        user = _user
    })

    await bcrypt.compare(req.body.pwdOld, user.pwd, (err, match) => {
        if(err) return res.json({err: errorMsg("Error changing password")})
        if(!match) return res.json({err: errorMsg("Incorrect old password")})
    })

    bcrypt.hash(req.body.newPwd, authConf.saltRounds, (err, hash) => {
        if(err) return res.json({err: errorMsg("Error changing password")})
        user.pwd = hash
        user.save(err => {
            if(err) return res.json({err: errorMsg("Error changing password")})
            res.json({msg: "Password changed"})
        })
    })

}

module.exports = changePassword