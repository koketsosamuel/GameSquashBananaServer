const User = require("../../models/User")
const bcrypt = require("bcrypt")
const errorMsg = require("../../util/errorMsg")

async function changeEmail(req, res) {

    let user

    await User.findOne({_id: req.user._id}, (err, _user) => {
        if(err) return res.json({err: errorMsg("Error changing email")})
        user = _user
    })

    await bcrypt.compare(req.body.pwd, user.pwd, (err, match) => {
        if(err) return res.json({err: errorMsg("Error changing email")})
        if(!match) return res.json({err: errorMsg("Incorrect password")})
    })

    user.email = req.body.newEmail
    user.save(err => {
        if(err) return res.json({err: errorMsg("Error changing email")})
        res.json({msg: "Email changed"})
    })
    

}

module.exports = changeEmail