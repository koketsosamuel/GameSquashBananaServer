const User = require("../../models/User")
const errorMsg = require("../../util/errorMsg")

function banUser(req, res) {

    User.updateOne({_id: req.params.userId}, {
        banned: req.body.banned
    }, (err) => {
        if(err) return res.json({err: errorMsg("Error changing the ban status of user")})
        res.json({msg: "User ban status updated!"})
    })

}

module.exports = banUser