const User = require("../../models/User")
const errorMsg = require("../../util/errorMsg")

async function changeEmail(req, res) {

    let user

    await User.findOne({_id: req.user._id}, (err, _user) => {
        if(err) return res.json({err: errorMsg("Error changing email")})
        user = _user
    })

    user.email = req.body.newEmail
    user.save(err => {
        if(err) return res.json({err: errorMsg("Error changing email")})
        res.json({msg: "Email changed"})
    })
    

}

module.exports = changeEmail