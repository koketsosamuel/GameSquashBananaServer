const User = require("../../models/User")
const errorMsg = require("../../util/errorMsg")

async function changePhone(req, res) {

    let user

    await User.findOne({_id: req.user._id}, (err, _user) => {
        if(err) return res.json({err: errorMsg("Error changing phone number")})
        user = _user
    })

    user.phone = req.body.newPhone
    user.save(err => {
        if(err) return res.json({err: errorMsg("Error changing phone number")})
        res.json({msg: "Phone number changed"})
    })
    

}

module.exports = changePhone