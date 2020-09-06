const User = require("../../models/User")
const bcrypt = require("bcrypt")
const authConf =require("../../config/auth")
const errorMsg = require("../../util/errorMsg")

async function changePassword(req, res) {

    let user = {}
    let match = true

    await User.findOne({_id: req.user._id}, (err, _user) => {
        if(err) return res.json({err: errorMsg("Error changing password")})
        user = _user
    })

    await bcrypt.compare(req.body.oldPwd, user.pwd, (err, _match) => {
        if(err) return res.json({err: errorMsg("Error changing password")})
        match = _match
    })

    if(!match) return res.json({err: errorMsg("Incorrect old password")})

    await bcrypt.hash(req.body.newPwd, authConf.saltRounds, (err, hash) => {
        if(err) return res.json({err: errorMsg("Error changing password")})
        user.pwd = hash     
        
        user.save(err => {
            if(err) return res.json({err: errorMsg("Error changing password")})
            res.json({msg: "Password changed"})
        })
    })

    

}

module.exports = changePassword